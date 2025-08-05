(function () {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')


  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

// switch toggle
 let eventToggle=document.getElementById("flexSwitchCheckDefault")
  eventToggle.addEventListener("click",()=>{
    let taxInfo=document.getElementsByClassName("tax-info");
    for(info of taxInfo){
      if(info.style.display != "inline"){
        info.style.display="inline"
      }
      else{
        info.style.display="none"
      }
    }
  })

   function scrollFilters(offset) {
    const container = document.getElementById("filters");
    container.scrollLeft += offset;
  }