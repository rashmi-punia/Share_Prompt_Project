import mongoose from 'mongoose'

let isConnected = false;

export const connectdb = async() =>{
    mongoose.set('strictQuery', true)

    if(isConnected){
        console.log('mongodb already connected');
        return
    }
    try{
await mongoose.connect(process.env.MONGODB_URI, {
    dbName: 'share_prompt',
    useNewUrlParser:true,
    useUnifiedTopology : true


})
isConnected=true
console.log('mongodb connected');
    }catch(error){
console.log(error);
    }
}