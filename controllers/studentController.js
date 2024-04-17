const db = require("../config/db")


//GET ALLL THE STUDENT LIST 
const getStudents = async (req, res) => {
    try {
        const data = await db.query("SELECT * FROM students")
        if (!data) {
            return res.status(404).send({
                success: false,
                message: "No record found"
            });
        }

        res.status(200).send({
            success: true,
            message: "All the Students Records",
            totalStudents: data[0].length,
            data: data[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error occured in Get All Student API',
            error
        })
    }
}
//GET STUDENT BY ID
const getStudentByID = async (req, res) => {
    try {
        const studentId = req.params.id
        if (!studentId) {
            return res.status(404).send({
                success: false,
                message: "Invalid or provided Student Id"
            })
        }

        // const data = await db.query(`SELECT * FROM students WHERE id `+studentId)
        const data = await db.query(`SELECT * FROM students WHERE id =?`, [studentId])
        if (!data) {
            return res.status(404).send({
                success: false,
                message: "No record found "
            })
        }

        res.status(200).send({
            success: true,
            studentDetails: data[0],
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Get student by id API",
            error
        })
    }
}

// CREAT STUDENT 
const createStudent = async (req, res) => {
    try {
        const { name, roll_no, fees, classs, medium } = req.body
        if (!name || !roll_no || !fees || !classs || !medium) {
            return res.status(500).send({
                success: false,
                message: "please Provide all the Fields"
            })
        }

        const data = await db.query(`INSERT INTO students (name, roll_no,  fees, classs, medium) VALUES (? , ? , ? , ? , ?)`, [name, roll_no, fees, classs, medium])
        if (!data) {
            return res.status(404).send({
                success: false,
                message: "Error in ERROR IN INSERT QUERY"

            })
        }

        res.status(201).send({
            success: true,
            message: " New Student Record Created"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in create Student API",
            error
        })

    }
}

//UPDATE STUDENT
const updateStudent = async (req, res) => {
    try {
        const studentId = req.params.id
        if (!studentId) {
            return res.status(404).send({
                success: false,
                message: "Invalid Id you gave"
            })
        }

        const { name, roll_no, fees, classs, medium } = req.body
        const data = await db.query(`UPDATE students SET name=?, roll_no=?,fees=?, classs=?, medium=? WHERE id=?`, [name, roll_no, fees, classs, medium, studentId])
        if (!data) {
            return res.status(500).send({
                success: false,
                message: "Error in Update Data",

            })
        }
        res.status(200).send({
            success: true,
            message: "Student Details is Updated Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error In Update Student API",
            error
        })

    }
}

//DELETE STUDENT
const deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        if (!studentId) {
            return res.status(404).send({
                success: false,
                message: "Please provide a valid student ID"
            })
        }

        // Execute the DELETE query
        await db.query(`DELETE FROM students WHERE id = ?`, [studentId]);

        // Send a success response back to the client
        res.status(200).send({
            success: true,
            message: "Student deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error occurred in Delete API",
            error
        });
    }
};

module.exports = {
    getStudents,
    getStudentByID,
    createStudent,
    updateStudent,
    deleteStudent
}