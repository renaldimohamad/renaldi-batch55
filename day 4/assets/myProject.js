let project = [];

function getDaysDifference(startDate, endDate) {
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  const FORMULA = 1000 * 60 * 60 * 24;

  const timeDifference = endDateObj.getTime() - startDateObj.getTime();

  const dayDifference = timeDifference / FORMULA;

  return dayDifference;
}

function resetForm() {
  document.getElementById("inputName").value = "";
  document.getElementById("inputDescription").value = "";
  document.getElementById("inputImage").value = "";
}

function submitData() {
  let inputName = document.getElementById("inputName").value;
  let inputDescription = document.getElementById("inputDescription").value;
  let inputImage = document.getElementById("inputImage").files;

  // DATE
  const startDateValue = document.getElementById("startDate").value;
  const endDateValue = document.getElementById("endDate").value;

  const dayDifference = getDaysDifference(startDateValue, endDateValue);

  if (inputName == "") {
    alert("The form must be filled in!");
  } else if (startDateValue == "") {
    alert("The form must be filled in!");
  } else if (endDateValue == "") {
    alert("The form must be filled in!");
  } else if (inputDescription == "") {
    alert("The form must be filled in!");
  } else if (inputImage[0] == undefined) {
    alert("The form must be filled in!");
  }

  const nodeJs = document.getElementById("nodeJs").checked;
  const nextJs = document.getElementById("nextJs").checked;
  const reactJs = document.getElementById("reactJs").checked;
  const phython = document.getElementById("phython").checked;

  console.log("check :", nodeJs);
  console.log("check :", reactJs);
  console.log("check :", nextJs);
  console.log("check :", phython);

  console.log("aman");
  console.log("Names :", inputName);
  console.log("Description :", inputDescription);

  inputImage = URL.createObjectURL(inputImage[0]);
  console.log("image :", inputImage);

  // RESET CHECK BOX
  const test = document.getElementsByName("tech");
  test.forEach((item) => {
    item.checked = false;
    console.log("check item", item.checked);
  });

  const myProject = {
    names: inputName,
    durationDate: dayDifference,
    description: inputDescription,
    Image: inputImage,
    nodeJs,
    nextJs,
    reactJs,
    phython,
  };

  project.push(myProject);

  // RESET FORM
  resetForm();

  render();
}

function render() {
  document.getElementById("contens").innerHTML = "";
  for (let index = 0; index < project.length; index++) {
    let renderTechIcons = "";

    if (project[index].nodeJs) {
      renderTechIcons += `<i class="fa-brands fa-node" style="font-size: 20px;"></i>`;
    }

    if (project[index].nextJs) {
      renderTechIcons += `<i class="fa-brands fa-js" style="font-size: 20px; margin-left: 10px;"></i>`;
    }

    if (project[index].reactJs) {
      renderTechIcons += `<i class="fa-brands fa-react" style="font-size: 20px; margin-left: 10px;"></i>`;
    }

    if (project[index].phython) {
      renderTechIcons += `<i class="fa-brands fa-python" style="font-size: 20px; margin-left: 10px; "></i>`;
    }

    document.getElementById("contens").innerHTML += `
    <div style="border: solid 1px white; box-shadow: 0px  5px 3px #999; width:300px;">
    <img style="margin-left: 12px; margin-top: 10px; border-radius: 7px; width: 275px; height: 160px;" src="${project[index].Image}" alt="" >
    <p class="text-style" style="font-weight: bold;">Dumbways Mobile App - 2024</p>
    <p style="font-weight: bold; margin-left: 15px;">${project[index].names}</p>    
        <p class="text-style" style="color:  rgb(87, 84, 82);"> durasi ${project[index].durationDate} Hari</p>
        <p class="text-style">${project[index].description}</p>
    <div style="display: flex; flex-direction: row; gap: 20px; margin-left: 15px; margin-bottom: 10px;">
    <i> ${renderTechIcons}</i>
    <i></i>
    <i></i>
    </div style="display: flex; flex-direction: row; gap: 10px;">
    <button class="button-style" ${index} style="margin-left: 15px; background-color: rgb(12, 20, 34);">edit</button>
    <button class="button-style" onclick="deleteData(${index})" style="margin-bottom: 10px; background-color: rgb(12, 20, 34);">delete</button>
    </div> `;
  }
}

// DELETE DATA
function deleteData(test) {
  console.log("check :", test);
  const testData = project.filter(function (item, index) {
    return index != test;
  });
  project = testData;
  render();
}
