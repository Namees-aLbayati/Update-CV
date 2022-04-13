const form = document.getElementById("contact-form"); 

//1.
const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();


//   let mail = new FormData(form);


    // show the form values
    const formData = new FormData(form);
    // to console.log formatdata
    const values = [...formData.entries()];
    console.log(values);


  sendMail(formData);
})

const sendMail = (mail) => {
    //1.
    fetch("/send", {
      method: "post", //2.
      body: mail, //3.

//    headers: {
//             'content-type': 'application/json'
//         },
    }).then((response) => {
if(response.ok){
    alert('thank you for your message,Namees will contact you soon')
}else{
    alert('somthing went wrong')
}    });
  };
