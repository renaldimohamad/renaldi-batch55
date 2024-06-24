//penggabungan promois dan juga ajax, jadi jita membuat janjik dulu supaya nungguin proses pengambilan data dari internet, ajax buat mengambil data dari innternet
//npoin.io , json formatter

const janji = new Promise((resolve, reject) => {
  console.log("testtest");

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.npoint.io/cb9bfdebc2ba90e638d7", true);
  xhr.onload = () => {
    console.log("checkkk");
    if (xhr.status === 200) {
      // console.log("berhasil", xhr.response)
      resolve(JSON.parse(xhr.response));
    } else {
      reject("Server Error!");
      // console.log("gagal", xhr.response)
    }
  };

  xhr.onerror = () => {
    //kesalahan kita sendiri / client
    reject("Network Error!");
    // console.log("network error! Please check your internet connection")
  };

  xhr.send();
});

// async function janji2() {
//     try {
//         const response = await fetch('https://api.npoint.io/cb9bfdebc2ba90e638d7')
//         console.log('response')
//         if (response.status === 200) {
//             const data = await response.json()

//             return data;
//         } else {
//             alert('API ERROR!')
//         }
//     } catch (error) {
//         alert("Network Error!")
//     }
// }

let testimonialData;

console.log("testimonialData", testimonialData);

async function allTestimonial() {
  let testimonialHTML = "";
  testimonialData = await janji;
  console.log("TestimonialData", testimonialData);
  testimonialData.forEach((item) => {
    testimonialHTML += ` 
        <div class="container-card">
            <img src="${item.image}" alt="">
            <p class="content">${item.contens}</p>
            <p class="author">- ${item.author}</p>
            <p class="review-rating">${item.ratting}<i class="fa-solid fa-star"></i>
        </div>
    </div>`;
  });

  document.getElementById("testimonials").innerHTML = testimonialHTML;
}

allTestimonial();

function filterTestimonial(ratting) {
  let testimonialHTML = "";

  console.log("check data:", testimonialData);
  const testimonialFiltered = testimonialData.filter((item) => {
    return item.ratting === ratting;
  });

  console.log("testimonialFiltered", testimonialFiltered);

  if (testimonialFiltered.length === 0) {
    testimonialHTML = `<h3> Data Not Found! </h3>`;
  } else {
    testimonialFiltered.forEach((item) => {
      testimonialHTML += `
            <div class="container-card">
                <img src="${item.image}" alt="">
                <p class="content">${item.contens}</p>
                <p class="author">- ${item.author}</p>
                <p class="review-rating">${item.ratting}<i class="fa-solid fa-star"></i>
            </div>
        </div>`;
    });
  }
  document.getElementById("testimonials").innerHTML = testimonialHTML;
}
