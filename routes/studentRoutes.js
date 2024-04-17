const express = require("express");
const { getStudents, getStudentByID, createStudent, updateStudent, deleteStudent } = require("../controllers/studentController");

//routes object
const router = express.Router();

//routes
//GET ALL STUDENT LIST || GET
router.get("/getall", getStudents);

//GET STUDENT BY ID
router.get('/get/:id', getStudentByID)

//CREAT STUDENT ||POST
router.post('/create', createStudent)

//UPDATE STUDENT ||PUT
router.put('/update/:id', updateStudent)

//DELETE STUDENT || DELETE
router.delete('/delete/:id', deleteStudent)
module.exports = router