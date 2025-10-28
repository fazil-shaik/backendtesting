import { get } from "http";
import pool from "./db.js";

async function fetchUsers() {
  try {
    const res = await pool.query("SELECT * FROM students"); // assuming table 'users' exists
    console.log(res.rows);
  } catch (err) {
    console.error(err);
  }
}

async function getSchool_db(){
  try {
    const res = await pool.query(`
      SELECT s.name AS student, c.course_name, c.instructor
      FROM student_courses sc
      JOIN students s ON s.student_id = sc.student_id
      JOIN courses c ON c.course_id = sc.course_id
      ORDER BY s.name;
    `); // assuming table 'school_db' exists
    console.log(res.rows);
  } catch (err) {
    console.error(err);
  } 
}
getSchool_db();

// fetchUsers();
