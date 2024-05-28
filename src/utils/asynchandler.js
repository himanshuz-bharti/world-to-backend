const asynchandler = (hand) =>{
    (req,res,next)=>{
        Promise.resolve(hand(req,res,next)).reject((err)=>next(err))
    }
}

export {asynchandler};