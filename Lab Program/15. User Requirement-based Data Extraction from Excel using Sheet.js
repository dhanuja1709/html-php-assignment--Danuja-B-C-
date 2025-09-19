
LaptopSheetJS.html 

<!DOCTYPE html> 
<html lang="en"> 
<head> 
<meta charset="UTF-8"> 
<title>Laptop Specifications</title> 
<script src="https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js"></script> 
<style> 
body { 
font-family: Arial, sans-serif; 
margin: 0; 
padding: 0; 
background: #f9f9f9; 
} 
.container { 
display: flex; 
height: 100vh; 
} 
.left-panel { 
width: 25%; 
background: #f4f4f4; 
padding: 20px; 
border-right: 2px solid #ccc; 
} 
.right-panel { 
width: 75%; 
padding: 20px; 
overflow-y: auto; 
display: flex; 
flex-wrap: wrap; 
gap: 20px; 
justify-content: center; 
} 
label { 
font-weight: bold; 
} 
select, input, button { 
width: 100%; 
 
      padding: 8px; 
      margin: 5px 0 15px; 
      border: 1px solid #ccc; 
      border-radius: 5px; 
    } 
    button { 
      background-color: #007bff; 
      color: white; 
      border: none; 
      cursor: pointer; 
    } 
    button:hover { 
      background-color: #0056b3; 
    } 
    .laptop-card { 
      background: white; 
      border: 1px solid #ddd; 
      border-radius: 8px; 
      padding: 15px; 
      width: 280px; 
      text-align: center; 
      box-shadow: 0 2px 5px rgba(0,0,0,0.1); 
    } 
    .laptop-card img { 
      width: 100%; 
      height: 160px; 
      object-fit: cover; 
      margin-bottom: 10px; 
      border-radius: 5px; 
    } 
    .laptop-card h3 { 
      margin: 10px 0 5px; 
      font-size: 18px; 
      color: #333; 
    } 
    .laptop-card p { 
      margin: 5px 0; 
      font-size: 14px; 
      color: #555; 
    } 
  </style> 
 
</head> 
<body> 
<div class="container"> 
<!-- Left Panel --> 
<div class="left-panel"> 
<h2>Search Laptops</h2> 
<label>Upload Excel File:</label> 
<input type="file" id="excelFile" accept=".xlsx, .xls"><br><br> 
<label>Model:</label> 
<select id="model"> 
<option value="">--Select Model--</option> 
</select> 
<label>RAM:</label> 
<select id="ram"> 
<option value="">--Select RAM--</option> 
</select> 
<button id="searchBtn">Search</button> 
</div> 
<!-- Right Panel --> 
<div class="right-panel" id="result"> 
<h2 style="width:100%">Laptop Specifications</h2> 
</div> 
</div> 
<script> 
let excelData = []; 
// Load Excel File 
document.getElementById("excelFile").addEventListener("change", (e) => { 
let reader = new FileReader(); 
reader.readAsArrayBuffer(e.target.files[0]); 
reader.onload = function() { 
let data = new Uint8Array(reader.result); 
let workbook = XLSX.read(data, {type: "array"}); 
let sheetName = workbook.SheetNames[0]; 
let sheet = workbook.Sheets[sheetName]; 
excelData = XLSX.utils.sheet_to_json(sheet); 
alert("Excel file loaded successfully!"); 
// Populate model dropdown 
let models = [...new Set(excelData.map(row => row.Model.split(" ")[0]))]; 
let modelSelect = document.getElementById("model"); 
modelSelect.innerHTML = '<option value="">--Select Model--</option>'; 
models.forEach(m => { 
modelSelect.innerHTML += <option value="${m.toLowerCase()}">${m}</option>; 
}); 
// Populate RAM dropdown 
let rams = [...new Set(excelData.map(row => row.RAM))]; 
let ramSelect = document.getElementById("ram"); 
ramSelect.innerHTML = '<option value="">--Select RAM--</option>'; 
rams.forEach(r => { 
ramSelect.innerHTML += <option value="${r}">${r}</option>; 
}); 
} 
}); 
// Search Function 
document.getElementById("searchBtn").addEventListener("click", function() { 
let model = document.getElementById("model").value.trim().toLowerCase(); 
let ram = document.getElementById("ram").value; 
let filtered = excelData.filter(row => { 
return (!model || row.Model.toLowerCase().includes(model)) && 
(!ram || row.RAM === ram); 
}); 
let output = ""; 
if(filtered.length > 0) { 
filtered.forEach(row => { 
output += ` 
<div class="laptop-card"> 
<img src="${row.Image}" alt="${row.Model}"> 
<h3>${row.Model}</h3> 
<p><b>RAM:</b> ${row.RAM}</p> 
<p><b>Hard Disk:</b> ${row.HardDisk}</p> 
<p><b>Display:</b> ${row.Display}</p> 
<p><b>Processor:</b> ${row.Processor}</p> 
<p><b>Graphics:</b> ${row.Graphics}</p> 
<p><b>Price:</b> ${row.Price}</p> 
</div> 
`; 
}); 
} else { 
output = "<p>No Laptop Found for Given Requirements</p>"; 
} 
document.getElementById("result").innerHTML = output; 
}); 
</script> 
</body> 
</html>
