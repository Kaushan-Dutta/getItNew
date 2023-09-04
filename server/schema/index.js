
const {requestModel,storeModel}=require('../models/Storemodel');
const {userModel,itemModel}=require('../models/Usermodel');

const {
    GraphQLObjectType,GraphQLString,GraphQLSchema,
    GraphQLID,GraphQLInt,GraphQLList} = require('graphql');

const UserType=new GraphQLObjectType({
    name:'User',
    fields:()=>({
        _id:{type:GraphQLID},
        username:{type:GraphQLString},
        address:{type:GraphQLString},
        itemsRequested:{
            type:new GraphQLList(ItemType),
            resolve(parent,args){
                return itemModel.find({owner:parent._id})
            }
        },
        
    })
})
const StoreType=new GraphQLObjectType({
    name:'Store',
    fields:()=>({
        _id:{type:GraphQLID},
        storename:{type:GraphQLString},
        address:{type:GraphQLString},
        itemsWorking:{
            type:new GraphQLList(RequestType),
            resolve(parent,args){
                return requestModel.find({store:parent._id})
            }
        }
    })
})
const ItemType=new GraphQLObjectType({
    name:'Item',
    fields:()=>({
        _id:{type:GraphQLID},
        image:{type:GraphQLString},
        status:{type:GraphQLString},
        owner:{type:GraphQLID},
        restoredby:{type:GraphQLID},
        /* madeBy:{
            type:UserType,
            resolve(parent,args){
                return userModel.findById(parent.owner)
            }
        } */
        requests:{
            type:new GraphQLList(RequestType),
            resolve(parent,args){
                return requestModel.find({item:parent._id})
            }
        }
    })
    
})
const RequestType=new GraphQLObjectType({
    name:'Request',
    fields:()=>({
        _id:{type:GraphQLID},
        item:{type:GraphQLID},
        store:{type:GraphQLID},
        newImage:{type:GraphQLString},
        recyclePrice:{type:GraphQLInt},
        deliveredBy:{type:GraphQLString},
        status:{type:GraphQLString},
   
    })
})
const Rootquery=new GraphQLObjectType({ 
    name:'Rootquery',
    fields:{
        store:{
            type:StoreType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return storeModel.findById(args.id)
            }
        },
        stores:{
            type:new GraphQLList(StoreType),
            async resolve(parent,args){
                const stores=await storeModel.find();
                console.log(stores);
                return stores;
            }
        },
        user:{
            type:UserType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return userModel.findById(args.id)
            }
        }
        
    }
});
const Rootmutation=new GraphQLObjectType({
    name:'Rootmutation',
    fields:{
       createUser:{
            type:UserType,
            args:{username:{type:GraphQLString},address:{type:GraphQLString}},
            resolve(parent,args){
                const user=new userModel({username:args.username,address:args.address});
                return user.save();
            }
       },
       createStore:{
         type:StoreType,
         args:{storename:{type:GraphQLString},address:{type:GraphQLString}},
         resolve(parent,args){
            const store=new storeModel({storename:args.storename,address:args.address});
            console.log(store)
            return store.save();
         }
       },
       createItem:{
         type:ItemType,
         args:{image:{type:GraphQLString},owner:{type:GraphQLID}},
         resolve(parent,args){
            const item=new itemModel({image:args.image,owner:args.owner})
            return item.save();
         }
       },
       createRequest:{
        type:RequestType,
        args:{item:{type:GraphQLID},store:{type:GraphQLID},newImage:{type:GraphQLString},
                recyclePrice:{type:GraphQLInt},deliveredBy:{type:GraphQLString}},
        resolve(parent,args){
           const request=new requestModel({item:args.item,store:args.store,newImage:args.newImage,recyclePrice:args.recyclePrice,deliveredBy:args.deliveredBy});
           return request.save();
        }
      },
       acceptRequest:{
        type:ItemType,
        args:{_id:{type:GraphQLID},storeId:{type:GraphQLID},itemId:{type:GraphQLID}},
        resolve(parent,args){
            const acceptInvite=requestModel.updateOne({_id:args._id},{$set:{status:'Accepted'}});
            const rejectInvite=requestModel.updateMany({$and:[{item:args.itemId},{status:'Pending'}]},{$set:{status:'Rejected'}});
            const updateItemreq=itemModel.updateOne({_id:args.itemId},{$set:{status:'Accepted',restoredby:args.storeId}});
            acceptInvite.save();
            rejectInvite.save();
            return updateItemreq.save();
        }
      } 
    }
})
module.exports=new GraphQLSchema({
    query:Rootquery,
    mutation:Rootmutation})
