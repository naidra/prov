(function () {
  let doc = document,
  	kej = [],
  	un,
  	links,
  	sect,
    json = {},
    timeStamp = 0,
    form;

  fetch('https://newsapi.org/v1/articles?source=national-geographic&apiKey=bd3e36eb77b649f68ae7ad8876fa9fe2', {method:'GET'})
  .then(response => response.json())
  .then(Json => json.first = Json);
  fetch('https://newsapi.org/v1/articles?source=cnn&apiKey=bd3e36eb77b649f68ae7ad8876fa9fe2', {method:'GET'})
  .then(response => response.json())
  .then(Json => json.second = Json);
  fetch('https://newsapi.org/v1/articles?source=fortune&apiKey=bd3e36eb77b649f68ae7ad8876fa9fe2', {method:'GET'})
  .then(response => response.json())
  .then(Json => json.third = Json);

  /*const httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function (data) {
    if (httpRequest.status == "200" && httpRequest.readyState == "4") {
      json.second = JSON.parse(httpRequest.response);
    }
  }
  httpRequest.open('POST', "http://api.openweathermap.org/data/2.5/weather?q=Prishtina&appid=9cd238f406afd12c601c305956d2814a");
  httpRequest.send();*/

  function LinkMeasurement(x, width) {
  	this.x = x;
  	this.width = width;
  }

  function scroll() {
      const scrollT = window.scrollY;
      const scrollB = window.scrollY + window.innerHeight;
  	for(var i = 0; i < sect.length; i++) {
  	    const secT = sect[i].offsetTop;
  	    const secB = sect[i].offsetTop + sect[i].offsetHeight;

  	    if (scrollT >= secT && scrollT < secB) {
  	      links[i].className = "ll";
  	    } else if (scrollT < secT || scrollT >= secB) {
  	      links[i].className = "";
  	    }
  	}
  	//if(window.innerWidth >= 650) pro();
  	for (var i = 0; i < links.length; i++) {
  	    if (links[i].className === "ll") { // ose (links[i].matches('.ll'))
  			un.style.cssText = `transform:translate3d(${kej[i].x}px,0,0);width:${kej[i].width}px;`;
  	    }
   	}
  }

  Math.easeInCirc = function (t, b, c, d) {
    t /= d;
    return -c * (Math.sqrt(1 - t*t) - 1) + b;
  };
  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) {
      return c/2*t*t + b
    }
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
  };

  Math.easeInCubic = function(t, b, c, d) {
    var tc = (t/=d)*t*t;
    return b+c*(tc);
  };

  Math.inOutQuintic = function(t, b, c, d) {
    var ts = (t/=d)*t,
    tc = ts*t;
    return b+c*(6*tc*ts + -15*ts*ts + 10*tc);
  };

  // requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
  var requestAnimFrame = (function(){
    return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };
  })();

  function scrollTo(to, callback, duration) {
    // because it's so fucking difficult to detect the scrolling element, just move them all
    function move(amount) {
      doc.documentElement.scrollTop = amount;
      doc.body.parentNode.scrollTop = amount;
      doc.body.scrollTop = amount;
    }
    function position() {
      return doc.documentElement.scrollTop || doc.body.parentNode.scrollTop || doc.body.scrollTop;
    }
    var start = position(),
      change = to - start,
      currentTime = 0,
      increment = 20;
    duration = (typeof(duration) === 'undefined') ? 500 : duration;
    var animateScroll = function() {
      // increment the time
      currentTime += increment;
      // find the value with the quadratic in-out easing function
      var val = Math.easeInCirc(currentTime, start, change, duration);
      // move the document.body
      move(val);
      // do the animation unless its over
      if (currentTime < duration) {
        requestAnimFrame(animateScroll);
      } else {
        if (callback && typeof(callback) === 'function') {
          // the animation is done so lets callback
          callback();
        }
      }
    };
    animateScroll();
  }
  function goTo(e) {
    if (e.target.tagName === "P") {
      ku = links.indexOf(e.target);
      je = sect[ku].offsetTop;
      scrollTo(je, null, 600);
    }
  }
  function randomm() {
    return ['#F87356', '#F1541F', '#345DBC', '#2D4E6B', '#3AC033', '#AA364E', '#1257F7'][Math.floor(Math.random()*6)];
  }

  function fetchAll(s) {
    const parent1 = s[0];
    const h2 = parent1.querySelector('h2');
    h2.innerText = json.first.source;
    parent1.querySelectorAll('li').forEach((ele, index) => {
      const article = json.first.articles[index];
      const dateTime = article.publishedAt.split('T');
      ele.innerHTML = `<div>
        <a href="${article.url}" target="_blank"><img src="${article.urlToImage}"></a>
      </div>
      <div>
        <h1>${article.title}</h1>
        <p>${article.description}</p>
        <p>${dateTime[0]} ${dateTime[1].split('+')[0]}</p>
        <p><b>${article.author}</b></p>
      </div>`;
      //ele.style.setProperty('--color', '#'+ Math.floor(Math.random()*16777215).toString(16));
      ele.style.setProperty('--color', randomm());
    });
    const parent2 = s[1];
    const h22 = parent2.querySelector('h2');
    h22.innerText = json.second.source;
    parent2.querySelectorAll('li').forEach((ele, index) => {
      const article = json.second.articles[index];
      const dateTime = article.publishedAt !== null ? article.publishedAt.split('T') : 0;
      ele.innerHTML = `<div>
        <a href="${article.url}" target="_blank"><img src="${article.urlToImage}"></a>
      </div>
      <div>
        <h1>${article.title}</h1>
        <p>${article.description}</p>
        <p>${dateTime[0]} ${dateTime[1]}</p>
        <p><b>${article.author}</b></p>
      </div>`;
      //ele.style.setProperty('--color', '#'+ Math.floor(Math.random()*16777215).toString(16));
      ele.style.setProperty('--color', randomm());
    });
    const parent3 = s[2];
    const h222 = parent3.querySelector('h2');
    h222.innerText = json.third.source;
    parent3.querySelectorAll('li').forEach((ele, index) => {
      const article = json.third.articles[index];
      const dateTime = article.publishedAt !== null ? article.publishedAt.split('T') : 0;
      ele.innerHTML = `<div>
        <a href="${article.url}" target="_blank"><img src="${article.urlToImage}"></a>
      </div>
      <div>
        <h1>${article.title}</h1>
        <p>${article.description}</p>
        <p>${dateTime[0]} ${dateTime[1]}</p>
        <p><b>${article.author}</b></p>
      </div>`;
      //ele.style.setProperty('--color', '#'+ Math.floor(Math.random()*16777215).toString(16));
      ele.style.setProperty('--color', randomm());
    });
  }

  function inForm() {
    (form.className !== 'in') ? form.className = 'in' : form.className = '';
  }
  function sendEm(e) {
    e.preventDefault();
    if (form.komenti.value <= 0) return;
    const dat = new FormData(form);
    const httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', "toTable.php");
    httpRequest.onreadystatechange = function (data) {
      if (httpRequest.status == "200" && httpRequest.readyState == "4") {
        inForm();
        form.reset();
        console.log(httpRequest.responseText);
      }
    }
    httpRequest.send(dat);
   //console.log(dat.getAll());
  }

  function oll() {
    console.log(json);
  	console.log("%c Company", "font-size: 40px; color: rgb(46,187,88);");
  	un = doc.querySelector('nav h1');
  	links = Array.from(doc.querySelectorAll('body > nav > div > p')),
  	sect = doc.querySelectorAll("body > section");
  	for (var i = 0, j = links.length; i < j; i++) {
  		const x = links[i].getBoundingClientRect().left,
  		  width = links[i].getBoundingClientRect().width;//ka edhe property: left, right, top, bottom, width, height edhe x, y amo jo te krejt browserat
  		kej[i] = new LinkMeasurement( x, width );
  	}
  	doc.addEventListener("scroll", scroll, {passive:true});
    links[0].parentNode.addEventListener('click', goTo);

    form = doc.querySelector('body > form');
    const formSpan = form.querySelector('span');
    formSpan.addEventListener('click', inForm);
    form.addEventListener('submit', sendEm);
    /*button.addEventListener('click', function(e) {
      e.preventDefault();
      const differ = (e.timeStamp/1000) - timeStamp;
      if (differ <= 1) return;
      console.log(differ);
      timeStamp = e.timeStamp/1000;
    });*/

  	let event = doc.createEvent('HTMLEvents');
  	event.initEvent('scroll', true, false);
  	doc.dispatchEvent(event);

    setTimeout(() => fetchAll(Array.from(doc.querySelectorAll('section'))), 1000);
    const spaan = doc.querySelector('body > span');
    spaan.className = 'out';
    setTimeout(() => spaan.parentNode.removeChild(spaan), 2500);
  }

  doc.addEventListener("DOMContentLoaded", oll, {once:true});
}());