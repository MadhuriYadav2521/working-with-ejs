import Candidates from "../modals/candidateModal.js"

export const renderAddCandidate = (req,res)=>{
    return res.render('addCandidate')
}

export const addCandidate = async (req,res) =>{
    try{
        const{candidateName} = req.body
        if(!candidateName) return res.render('addCandidate',{message: "Candidate name is manadatory!"})
        const existingCandidate = await Candidates.findOne({candidateName}).exec();
        if(existingCandidate) return res.render('addCandidate',{message:"Candidate already exist!"})
        const candidate = new Candidates({
            candidateName
        })
        await candidate.save();
        return res.render('addCandidate', {success: "Candidate added sussessfully!"})
    }catch(err){
        return res.send(err)
    }
}