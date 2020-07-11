export default (mongoose) =>{
    const schema = mongoose.Schema({

        name:{
            type:String,
            require: true,
        },
        subject:{
            type: String,
            require: true,
        },
        type:{
            type: String,
            require: true,
        },
        value:{
            type: Number,
            require: true,
            validate(value){
                if(value < 0) throw("Valor negativo para a nota não permitido")
            },
        },
        lastModified:{
            type: Date,
            require: true,
        },

        versionKey: false,
    });
    
    const grades = mongoose.model("grade", schema,"grade");
    return grades;
}