function resetForm() {
    document.getElementById('inputName').value = ""
    document.getElementById('inputEmail').value = ""
    document.getElementById('inputNumber').value = ""
    document.getElementById('inputSubject').value = ""
    document.getElementById('inputDescription').value = ""
}

function submitData() {
    const inputName = document.getElementById('inputName').value
    const inputEmail = document.getElementById('inputEmail').value
    const inputNumber = document.getElementById('inputNumber').value
    const inputSubject = document.getElementById('inputSubject').value
    const inputDescription = document.getElementById('inputDescription').value
    
    if (inputName == "") {
        alert('The form must be filled in!')
    } else if (inputEmail == "") {
        alert('The form must be filled in!')
    } else if (inputNumber == "") {
        alert('The form must be filled in!')
    } else if (inputSubject == "") {
        alert('The form must be filled in!')
    } else if (inputDescription == "") {
        alert('The form must be filled in!')
    } else {
 
    console.log('Name :', inputName);
    console.log('Email :', inputEmail);
    console.log('Number :', inputNumber);
    console.log('Subject :', inputSubject);
    console.log('Description :', inputDescription);
 
    const emailReceiver = "dumbways@gmail.com"
    const subject = "lets talk"
    const body = "im Renaldi Mohamad nice to meet you brother"

    let a = document.createElement('a')
    a.href = `mailto:${emailReceiver}?subject=${inputSubject}&body=${body} `
    a.click(submitData)

    resetForm()

}
}