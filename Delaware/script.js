apiBaseUrl = "https://localhost:7188/api/ESGScore";

$.ajax({
  url: apiBaseUrl,
  type: "GET",
  dataType: "json",
  success: function (data) {
    console.log(data)

    for (var key in data) {
      element = data[key]
      for(let x = 0; x < 3; x++){
        companyName = element[x].naam;
        ranking = x+1;
        environmentPerc = element[x].environment + "%";
        governancePerc = element[x].governance + "%";
        socialPerc = element[x].social + "%";
        productPerc = (74 - x*3).toString() + "%";
        globalPercentage = element[x].esgBedrijf + "%";
      
        cardHtml = ` <a href="" style="text-decoration:none; color:black;">
      <div class="card text-center"  style="width:21%">
        <div class="card-body">
          <h5 class="card-title">${ranking}. ${companyName}</h5>
          <div style="display:flex; justify-content:center;">
            <h6 style="border-radius: 50%;padding:1.3em;  display: flex; /* or inline-flex */align-items: center; justify-content: center; width:30px; height:30px; border:1px solid black;">${globalPercentage}</h6>
          </div>
          <div style="text-align:start; margin-left: 3em;">
            <p class="card-text"><img style="margin-right:8px" width="30px" src="icons/environment-icon-png-20.webp">Environment: <span style="margin-left: 10px;">${environmentPerc}</span></p>
            <p class="card-text"><img style="margin-right:8px"width="30px" src="icons/images.png">Governance: <span style="margin-left: 16px;">${governancePerc}</span> </p>
            <p class="card-text"><img style="margin-right:5px" width="30px" src="icons/images (1).png"> Social: <span style="margin-left: 58px;">${socialPerc}</span></p>
            <p class="card-text"><img style="margin-right:8px" width="30px" src="icons/icon-product-5.jpg">Product: <span style="margin-left: 45px;">${productPerc}</span></p>
          </span>
        </div>
      </div>
      </a>`;
      
        document
          .getElementById("topThreeCards")
          .insertAdjacentHTML("beforeend", cardHtml);
      }
      for (let x = 3; x < element.length; x++) {
        console.log(x)
        companyAccordion = element[x].naam;
        scoreAccordion = element[x].esgBedrijf;
        environmentPerc = element[x].environment+ "%";
        governancePerc = element[x].governance + "%";
        socialPerc = element[x].social + "%";
        productPerc = (74 - x *6).toString() + "%";
        globalPercentage = element[x].esgBedrijf + "%";
      
        accordionHtml = `<div class="accordion-item">
          <h2 class="accordion-header" id="flush-heading${x}">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${x}" aria-expanded="false" aria-controls="flush-collapse${x}">
              ${x}. ${companyAccordion}: ${scoreAccordion}%
          </button>
          </h2>
          <div id="flush-collapse${x}" class="accordion-collapse collapse" aria-labelledby="flush-heading${x}" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
          <h5>Details: </h5>
          <div style="display:flex; column-gap: 13em">
              <p class="card-text"><img style="margin-right:8px" width="30px" src="icons/environment-icon-png-20.webp">Environment: ${environmentPerc}</p>
              <p class="card-text"><img style="margin-right:8px"width="30px" src="icons/images.png">Governance: ${governancePerc} </p>
              <p class="card-text"><img style="margin-right:5px" width="30px" src="icons/images (1).png"> Social: ${socialPerc}</p>
              <p class="card-text"><img style="margin-right:8px" width="30px" src="icons/icon-product-5.jpg">Product: ${productPerc}</p>
              <button class="btn btn-primary" style="height:50px">Choose</button>
      
          </div>
      
          </div>
          </div>
          </div>`;
      
        document
          .getElementById("accordionFlushExample")
          .insertAdjacentHTML("beforeend", accordionHtml);
      }
       
      };
  }
  });

// fetch(apiBaseUrl, {
//   method: "GET", // *GET, POST, PUT, DELETE, etc.
//   mode: "no-cors",
// }) // , *cors, same-origin)
//   .then((response) => response.json())
//   .then((data) => console.log(data));

