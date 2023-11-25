const Students = require("../models/StudentsModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



const getAllStudents = async(req, res)=>{

    return res.status(200).json({
        message: "Successfully from controller"
    })
}


const studentSignUp = async(req, res)=>{

    const { name, email, password, dept, location } = req.body

    const alreadyExisting =  await Students.findOne({ email })

    if(alreadyExisting){
        return res.status(400).json({message: "This user account already exixt!"})
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newStudent = new Students({ name, email, password: hashedPassword, dept, location })

    await newStudent.save()

    return res.status(200).json({
        mesasge: "Registration successful",
        student: newStudent
    })
}

const studentLogin = async(req, res)=>{

    const { email, password } = req.body

    const alreadyExisiting = await Students.findOne({ email })

    if(!alreadyExisiting){
        return res.status(404).json({message: "This user does not exist!"})
    }
    
    const isMatch = await bcrypt.compare(password, alreadyExisiting.password)

    if(!isMatch){
        return res.status(400).json({message: "Incorrect email or password!"})
    }

    const payload = {
        id: alreadyExisiting._id,
        role: "user"
    }


    const activeToken = await jwt.sign(payload, process.env.Token, {expiresIn: "5h"})
    const accessToken = await jwt.sign(payload, process.env.Token, {expiresIn: "3m"})
    const refreshToken = await jwt.sign(payload, process.env.Token, {expiresIn: "3d"})

    alreadyExisiting.refreshToken = refreshToken

    await alreadyExisiting.save()




    return res.status(200).json({
        message: "Login successful",
        accessToken,
        user: alreadyExisiting
    })
}



module.exports = {
    getAllStudents,
    studentSignUp,
    studentLogin
    
}