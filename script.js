
const handleCategory = async () =>{
  const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
  const data = await res.json();
  const array = data.data;
  const tabContainer = document.getElementById('tab-container');
  
  array.forEach((category) => {
   
    const div = document.createElement('div');
    div.innerHTML = `
    <button onclick = "handleLoadNews('${category.category_id}')" class=" tabs-boxed  bg-slate-400 text-white font-semibold text-2xl p-2 mx-3"> ${category.category}</button> 
    `;

    tabContainer.appendChild(div)
  }
  )
}
  
    const handleLoadNews = async (id) => {
      const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
      const data = await response.json();
      const idData = data.data;
      
     
      const cardContainer = document.getElementById('card-container');
      cardContainer.textContent = '';
         
      if (idData.length == 0) {
        document.getElementById('no-video').classList.remove('hidden');
      }
      else{
        document.getElementById('no-video').classList.add('hidden');
      }

      idData?.forEach((video) => {
        
        const div = document.createElement('div');
         div.innerHTML = `
        
         <div class="card card-compact  md:bg-gray-300 shadow-xl">
          <figure>
            <img class="w-96  h-52 md:w-96 md:h-48 lg:w-80 lg:h-52 relative" src="${video.thumbnail}" alt="thumbnail" />
            ${video.others.posted_date && `<h1 class="bg-black p-2 text-white absolute mt-36 ml-40"> ${convertTime(video.others.posted_date)}</h1>`}
            
          </figure>

       <div class="card-body">
       
          <div class="flex gap-5 justify-center lg:justify-start">
               <div class="author">
                  
                     <img class="w-10 h-10  rounded-full" src=${video.authors[0].profile_picture} />
                  
               </div>
               <h2 class="card-title"> ${video.title}</h2>
          </div>
          <div class=" flex justify-center lg:justify-start">
            <h6>${video.authors[0].profile_name}</h6>
            <small>
               ${video.authors[0].verified? video.authors[0].verified && '<img src="Asset/fi_10629607.png" alt="">' : ''} 
              </small>
            </div>
            <small class="  text-center lg:text-left">${video.others.views} views</small>
          </div>
        </div>
              
      
        
         `;
        cardContainer.appendChild(div);
      })
    }


    function convertTime(seconds){
      const hours = Math.floor(seconds / 3600) ;
      const minutes = Math.floor(seconds % 3600) / 60 ;
      const minParseFloat = parseInt(minutes); 
      return `${hours}hrs ${minParseFloat}mins ago`;
    }

handleCategory();
handleLoadNews(	"1000");






