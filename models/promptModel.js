import {Schema, models, model} from "mongoose";

const propmtSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref : 'User'
    },
    prompt:{
        type: String,
        required:[true,'Prompt is required']
    },
    tag : {
        type :String,
        required: [true,'Tag is required']
    }
}, {
    timestamps : true
});

const Prompt = models.Prompt || model('Prompt',propmtSchema)

export default Prompt;
