import { Schema , model , models , Document  } from "mongoose";
import { Content } from "next/font/google";

export interface IAnswer extends Document {

    author: Schema.Types.ObjectId;
    question: Schema.Types.ObjectId;
    content : string;
    upvotes: Schema.Types.ObjectId[];
    downvotes: Schema.Types.ObjectId[];
    createdAt: Date;
}

const AnswerSchema = new Schema({
    author: {type: Schema.Types.ObjectId , ref: 'User'},
    question: {type:Schema.Types.ObjectId , ref : 'Question' , require: true},
    content : {type: String , require : true},
    upvotes: [{type: Schema.Types.ObjectId , ref: "User"}],
    downvotes: [{type: Schema.Types.ObjectId , ref: "User"}],
    createdAt : {type: Date , default : Date.now}
});

const Answer = models.Answer || model('Answer', AnswerSchema);

export default Answer;
