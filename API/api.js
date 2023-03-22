export const categories = [
  {
    image: "https://img.icons8.com/external-flaticons-flat-flat-icons/344/external-newspaper-press-and-media-flaticons-flat-flat-icons-2.png",
    name: "general",
  },
  {
    image: "https://img.icons8.com/color/344/commercial-development-management.png",
    name: "business",
  },
  {
    image: "https://img.icons8.com/ultraviolet/344/theatre-mask.png",
    name: "entertainment",
  },
  {
    image: "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/344/external-health-hygiene-flaticons-lineal-color-flat-icons-5.png",
    name: "health",
  },
  {
    image: "https://img.icons8.com/external-kosonicon-flat-kosonicon/344/external-laboratory-vaccine-and-laboratory-kosonicon-flat-kosonicon.png",
    name: "science",
  },
  {
    image: "https://img.icons8.com/color/344/sports.png",
    name: "sports",
  },
  {
    image: "https://img.icons8.com/external-flaticons-flat-flat-icons/344/external-technology-new-media-flaticons-flat-flat-icons.png",
    name: "technology",
  },
];

export const sources = [
  {
    id: "bbc-news",
    name: "BBC News",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/BBC_News_2019.svg/1200px-BBC_News_2019.svg.png",
  },
  {
    id: "business-insider",
    name: "Business Insider",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeo9ly-Tc6UPMNW6_ekQ2r0L3e2WauGnUTLDVEmDtGG1tRsyCw4hCnq2XzwiKTdd8V3KI&usqp=CAU",
  },
  {
    id: "buzzfeed",
    name: "Buzzfeed",
    image: "https://d26oc3sg82pgk3.cloudfront.net/files/media/edit/image/31358/square_thumb%403x.jpg",
  },
  {
    id: "cnn",
    name: "CNN",
    image: "https://bankimooncentre.org/wp-content/uploads/2020/06/cnn-logo-square.png",
  },
  {
    id: "fox-news",
    name: "Fox News",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Fox_News_Channel_logo.svg/768px-Fox_News_Channel_logo.svg.png",
  },
  {
    id: "google-news",
    name: "Google News",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Google_News_icon.png",
  },
  {
    id: "national-geographic",
    name: "National Geographic",
    image: "https://cdn2.mhpbooks.com/2018/03/8314256770_9c5f3ab104.jpg",
  },
  {
    id: "nbc-news",
    name: "NBC News",
    image: "https://www.afsc.org/sites/default/files/styles/maxsize/public/images/NBC%20News.png?itok=QyB1uaGb",
  },
  {
    id: "time",
    name: "Time",
    image: "https://api.time.com/wp-content/themes/time2014/img/time-logo-og.png",
  },
];

export const url = "https://newsapi.org/v2";
export const apiKey = "apiKey=ebe240a25c284b83bb9be18bf4e51023"

// get news by category and country
export const getNewsAPI = (category, country = "us") => {
  return `${url}/top-headlines?country=${country}&category=${category}&${apiKey}`;
};

export const getSourceAPI = (sources, language = "en") => {
  return `${url}/top-headlines?sources=${sources}&language=${language}&${apiKey}`;
};
