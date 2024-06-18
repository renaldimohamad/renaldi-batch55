function submitData(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  formData.forEach((value, key) => {
    console.log("check :", key);
  });

  const inputSubject = formData.get("subject");

  const emailReceiver = "dumbways@gmail.com";
  const subject = "lets talk";
  const body = "im Renaldi Mohamad nice to meet you brother";

  let mailtoLink = `mailto:${emailReceiver}?subject=${subject}&body=${body}`;

  let a = document.createElement("a");
  a.href = mailtoLink;

  a.click();

  form.reset();
}
