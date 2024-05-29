import multer from "multer";

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/temp");
    },
    filename:function(req,file,cb){
        const uniq = `${Date.now()}-${file.originalname}`
        cb(null,uniq);
    }
})

export const upload = multer({storage:storage});