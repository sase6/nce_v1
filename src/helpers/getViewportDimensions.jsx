const getViewport = () => {

 var viewPortWidth;
 var viewPortHeight;

 if (typeof window.innerWidth != 'undefined') {
   viewPortWidth = window.innerWidth,
   viewPortHeight = window.innerHeight
 }

 else if (typeof document.documentElement != 'undefined'
 && typeof document.documentElement.clientWidth !=
 'undefined' && document.documentElement.clientWidth != 0) {
    viewPortWidth = document.documentElement.clientWidth,
    viewPortHeight = document.documentElement.clientHeight
 }

 else {
   viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
   viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
 }
 return [viewPortWidth, viewPortHeight];
};

export default getViewport;