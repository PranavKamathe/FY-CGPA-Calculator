



function theoryTotal(att, internals, insem, ese) {
  return Number(att || 0) + Number(internals || 0) +
         Number(insem || 0) + Number(ese || 0);
}










function labTo100(marks, max) {
  return (Number(marks || 0) / max) * 100;
}


















function marksToGradePoint(marks) {
if (marks>=91) return 10;
if (marks>=81) return 9;
if (marks>=71) return 8;
if (marks>=61) return 7;
 if (marks >= 51) return 6;
  if (marks >= 41) return 5;
    return 0;
}








function gradeFromGP(gp) {
  if (gp===10) return "O";
  if (gp===9) return "A+";
  if (gp===8) return "A";
  if (gp===7) return "B+";
  if (gp===6) return "B";
  if (gp===5) return "C";
  return "F";
}



function saveToGoogleSheets(name, sgpa, subjects, cgpa) {
  fetch("https://script.google.com/macros/s/AKfycbwzbOnce70J7_0GPkh6HzgYETGc4-C2b-sCBOtpH8fMZPvRvJg0k1RxEJNYi2Lm9-8SSw/exec", {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({
      name: name,
      sgpa: sgpa,
      subjects: subjects,
      cgpa: cgpa
    })
  })
  .then(() => console.log("Saved to Google Sheets"))
  .catch(err => console.error("Sheets Error:", err));
}





      document.getElementById("sgpaForm").addEventListener("submit", (e) => {
  e.preventDefault();





 const studentName = document.getElementById("studentName").value.trim();
  if (studentName==="") {
  alert(" Please enter your name before calculating SGPA!");
    return;
  }

  const subjects = [

 { name:"LAC",marks:theoryTotal(lac_att.value, lac_int.value, lac_insem.value, lac_ese.value) , credits: 3 },

 {name:"CST/QP",marks:theoryTotal(cst_att.value, cst_int.value, cst_insem.value, cst_ese.value),                       credits: 2 },




    {name:"CGD/MFR",marks:theoryTotal(cgd_att.value, cgd_int.value, cgd_insem.value, cgd_ese.value),   credits: 2 },




    {name:"CPPS/OOPS",marks:theoryTotal(cpps_att.value, cpps_int.value, cpps_insem.value, cpps_ese.value),    credits: 2 },




    {name:"ESE/IEEE",marks:theoryTotal(ese_att.value, ese_int.value, ese_insem.value, ese_ese.value),   credits: 2 },



    {name: "LAC Lab", marks: labTo100(lacLab.value, 25), credits: 1 },




    {name: "CST Lab", marks: labTo100(cstLab.value, 25), credits: 1 },



    {name: "CGD Lab", marks: labTo100(cgdLab.value, 25), credits: 1 },


    {name: "CPPS Lab", marks: labTo100(cppsLab.value, 25), credits: 1 },


    {name: "IIDTL/IKS", marks: labTo100(iidtl.value, 50), credits: 1 },



    {name: "Soft Skills", marks: labTo100(ss.value, 25), credits: 2 },



    {name: "CCA-1", marks: labTo100(cca.value, 25), credits: 1 },


{name: "NPTEL", marks: labTo100(nptel.value, 25), credits: 1 }
  ];

  let totalCredits = 0;
  let weightedPoints = 0;




  subjects.forEach(sub =>{
    const gp = marksToGradePoint(sub.marks);
    weightedPoints += gp * sub.credits;
    totalCredits += sub.credits;
  });


  const sgpa = (weightedPoints/totalCredits).toFixed(2);
const sem1sgpa=document.getElementById("sem1-sgpa").value.trim();


const cgpa=((sgpa*21+sem1sgpa*19)/40).toFixed(2);
        
console.log(cgpa);





  document.getElementById("result").innerHTML =
   `<b>${studentName}, Your SGPA is: ${sgpa}</b>
   <br>
   <br>
   <b>Your CGPA is: ${cgpa} </b>
   
   
   `;





  saveToGoogleSheets(studentName, sgpa, subjects,cgpa);


  const gradeTable = document.getElementById("gradeTable");
  const gradeBtn = document.getElementById("gradeBtn");

  gradeTable.innerHTML =  `
    <tr>
      <th>Subject</th>
      <th>Marks</th>
      <th>Grade</th>
      <th>GP</th>
    </tr>
  `  ;









  subjects.forEach(subject => {



    const gp = marksToGradePoint(subject.marks);
    const grade = gradeFromGP(gp);

    const row = document.createElement("tr");



    row.innerHTML = `
      <td>${subject.name}</td>
      <td>${subject.marks.toFixed(1)}</td>
      <td>${grade}</td>
      <td>${gp}</td>
    `;
    gradeTable.appendChild(row);
  });

  gradeBtn.classList.remove("hidden");
});





const modal = document.getElementById("gradeModal");
const closeBtn = document.getElementById("closeModal");
const gradeBtn = document.getElementById("gradeBtn");






gradeBtn.onclick = () => modal.classList.remove("hidden");
closeBtn.onclick = () => modal.classList.add("hidden");
      
