      // OBJECT ORIENTED PROGRAMMING
 
 // class Testimonials {
//     constructor(image, author, contens) {
//         this.image = image
//         this.author = author
//         this.contens = contens
//     }

//     html() {
//          return `
//         <div class="container-card">
//         <img src="${this.image}" alt="">
//         <p class="content">${this.contens}</p>
//         <p class="author">-${this.author}</p>
//         </div>
//     </div>`
//     }
// }

// const testimonial1 = new Testimonials("https://images.pexels.com/photos/7545185/pexels-photo-7545185.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load","Every page is a new journey", "Antonio Elz")
// const testimonial2 = new Testimonials("https://images.pexels.com/photos/8929332/pexels-photo-8929332.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load", "Bury yourself in the melody,", "Agatha Christie")
// const testimonial3 = new Testimonials("https://images.pexels.com/photos/926390/pexels-photo-926390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "digital world, one click at a time", "Surya Elidanto")

// const testimonial = [testimonial1, testimonial2, testimonial3]
// console.log(testimonial);

// let testimonialHTML = ''
// for(let index = 0; index < testimonial.length; index++) {
//     testimonialHTML += testimonial[index].html()
// }

// document.getElementById('testimonials').innerHTML = testimonialHTML


// const testimonialData = [
//     {
//         author: "renaldi",
//         contens: "keren banget",
//         Image: "https://images.pexels.com/photos/567459/pexels-photo-567459.jpeg?auto=compress&cs=tinysrgb&w=600",
//         ratting: 5
//     },
//     {
//         author: "aldi",
//         contens: "mantap",
//         Image: "https://images.pexels.com/photos/567459/pexels-photo-567459.jpeg?auto=compress&cs=tinysrgb&w=600",
//         ratting: 2
//     },
//     {
//         author: "mohamad",
//         contens: "keren!",
//         Image: "https://images.pexels.com/photos/567459/pexels-photo-567459.jpeg?auto=compress&cs=tinysrgb&w=600",
//         ratting: 4
//     }
// ]

// function allTestimonial() {
//     let testimonialHTML = ``
//     testimonialData.forEach((item) => {
//         testimonialHTML += ` <div class="testimonial">
//              <img class="img-testimonial" src="${item.Image}" alt="">
//              <p class="contents-testimonial">"${item.contens}"</p>
//              <p class="author-testimonial">~${item.author}</p>
//              <p class="author-testimonial">${item.ratting}<i class="fa-solid fa-star"></i> </p>
//          </div>
//         </nav>`
//     })
//     document.getElementById("testimonials").innerHTML = testimonialHTML
// }


// allTestimonial()

// function filterTestimonial(ratting) {
//     let testimonialHTML = ``
//     const testimonialFiltered = testimonialData.filter((item) => {
//         return item.ratting === ratting
//     })

//     if (testimonialFiltered.length === 0) {
//         testimonialHTML = `<h3>Data Not Found!</h3>`
//     } else {
//         testimonialFiltered.forEach((item) => {
//             testimonialHTML += ` <div class="testimonial">
//              <img class="img-testimonial" src="${item.Image}" alt="">
//              <p class="contents-testimonial">"${item.contens}"</p>
//              <p class="author-testimonial">~${item.author}</p>
//              <p class="author-testimonial">${item.ratting}<i class="fa-solid fa-star"></i> </p>
//          </div>
//         </nav>`
//         })
//     }
//     document.getElementById("testimonials").innerHTML = testimonialHTML
// }


// filterTestimonial()


   
    // HIGHER ORDER FUNCTION
   
const testimonialData = [
    {
        image: "https://images.pexels.com/photos/7545185/pexels-photo-7545185.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        contens: "Build a foundation for the future with every piece learned",
        author: "Antonio Elz",
        ratting: 5
    },
    {
        image: "https://images.pexels.com/photos/8929332/pexels-photo-8929332.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        contens: "Flowing with harmony, letting the soul fly free along with the violin melody",
        author: "Agatha Christie",
        ratting: 3
    },
    {
        image: "https://images.pexels.com/photos/926390/pexels-photo-926390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        contens: "Anchored in the digital world, chasing dreams one click at a time",
        author: "Surya Elidanto",
        ratting: 4
    },
    {
        image: "https://images.pexels.com/photos/842548/pexels-photo-842548.jpeg?auto=compress&cs=tinysrgb&w=600",
        contens: "It's time to embrace the day with a cup of warmth",
        author: "Ethan Blackwood",
        ratting: 4
    },
    {
        image: "https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        contens: "Ayo jelajahi dunia, topi bulatku akan menuntun langkahku",
        author: "Garrett Hart",
        ratting: 3
    },
    {
        image: "https://images.pexels.com/photos/10973825/pexels-photo-10973825.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        contens: "When the eyes are glued to the page, the soul explores the beauty of the words",
        author: "Lucas Archer",
        ratting: 5
    },
    {
        image: "https://images.pexels.com/photos/3761513/pexels-photo-3761513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        contens: "In this world, education is the key to opening the door to the future",
        author: "Ruby Wells",
        ratting: 2
    },
    {
        image: "https://images.pexels.com/photos/3638045/pexels-photo-3638045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        contens: "Classic never goes out of style: style with a round hat.",
        author: "Brett Sayles",
        ratting: 1
    }
]

function allTestimonial() {
    let testimonialHTML = ``
    testimonialData.forEach((item => {
        testimonialHTML += `
          <div class="container-card">
         <img src="${item.image}" alt="">
        <p class="content">${item.contens}</p>
        <p class="author">- ${item.author}</p>
        <p class="review-rating">${item.ratting}<i class="fa-solid fa-star"></i>
        </div>
    </div>`
    }))

    document.getElementById('testimonials').innerHTML = testimonialHTML
}

allTestimonial()

function filterTestimonial(ratting) {
        let testimonialHTML = ``
        const testimonialFiltered = testimonialData.filter((item) => {
            return item.ratting === ratting
        })
    
        if (testimonialFiltered.length === 0) {
            testimonialHTML = `<h3>Data Not Found!</h3>`
        } else {
            testimonialFiltered.forEach((item) => {
                testimonialHTML += `
                <div class="container-card">
         <img src="${item.image}" alt="">
        <p class="content">${item.contens}</p>
        <p class="author">- ${item.author}</p>
        <p class="review-rating">${item.ratting}<i class="fa-solid fa-star"></i>
        </div>
    </div> 
`
            })
        }
        document.getElementById("testimonials").innerHTML = testimonialHTML
    }
    
    
    filterTestimonial()




  