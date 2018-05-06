window.onload=function(){
	Scrolly.bind('*[scrolly]');
};

function MoveEvent(event){
	var eventDoc, doc, body;

    event = event || window.event;
		
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
           	(doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
            (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
            (doc && doc.clientTop  || body && body.clientTop  || 0 );
    }
    return event;
}

function disableSelect(event){
	event.preventDefault();
}

class Scrolly{
	
	static bind(selector){
		document.querySelectorAll(selector).forEach(element => new Scrolly(element));
	}

	constructor(element){
		this.element = element;
		window.addEventListener("resize", this.load.bind(this));
		this.scrolly = null;
		this.scrollyHor = null;
		if(this.element.getAttribute("scrolly-arrow") !== null){
			this.arrow = true;
		}else{
			this.arrow = false;
		}
		this.load();
	}

	positionVer(){
		let pos = 0;
		let size = this.scrolly.offsetHeight - this.scrollBar.offsetHeight;
		if(this.arrow){
			size -= this.upArrow.offsetHeight + this.downArrow.offsetHeight;
		}
		let perc = 0;
		if(this.scrollyHor !== null){
			if(this.element.getAttribute("scrolly-top") === null){
				perc = -this.contain.offsetTop / (this.contain.offsetHeight - this.element.offsetHeight + this.scrollBarHor.offsetHeight); 
			}else{
				perc = -(this.contain.offsetTop-this.scrollBarHor.offsetHeight) / (this.contain.offsetHeight - this.element.offsetHeight + this.scrollBarHor.offsetHeight);
			}
		}else{
			perc = -this.contain.offsetTop / (this.contain.offsetHeight - this.element.offsetHeight);
		}
		let dist = perc * size;
		if(this.arrow){
			dist += this.upArrow.offsetHeight;
		}
		let place = dist + this.scrollBar.offsetHeight/2;
		pos = place - this.scrollBar.offsetHeight/2;
		this.scrollBar.style.top = pos + "px";
	}

	positionHor(){
		let pos = 0;
		let size = this.scrollyHor.offsetWidth - this.scrollBarHor.offsetWidth;
		if(this.arrow){
			size -= this.leftArrow.offsetWidth + this.rightArrow.offsetWidth;
		}
		let perc = 0;
		if(this.scrolly !== null){
			if(this.element.getAttribute("scrolly-left") === null){
				perc = -this.contain.offsetLeft / (this.contain.offsetWidth - this.element.offsetWidth + this.scrollBar.offsetWidth);
			}else{
				perc = -(this.contain.offsetLeft-this.scrollBar.offsetWidth) / (this.contain.offsetWidth - this.element.offsetWidth + this.scrollBar.offsetWidth);
			}
		}else{
			perc = -this.contain.offsetLeft / (this.contain.offsetWidth - this.element.offsetWidth);
		}
		let dist = perc * size;
		if(this.arrow){
			dist += this.leftArrow.offsetWidth;
		}
		let place = dist + this.scrollBarHor.offsetWidth/2;
		pos = place - this.scrollBarHor.offsetWidth/2;
		this.scrollBarHor.style.left = pos + "px";
	}

	scrollyVermove(posY){
		if(this.arrow){
			if(posY < this.upArrow.offsetHeight) posY = this.upArrow.offsetHeight;
			if(posY+this.scrollBar.offsetHeight > this.scrolly.offsetHeight - this.downArrow.offsetHeight) posY = this.scrolly.offsetHeight - this.downArrow.offsetHeight - this.scrollBar.offsetHeight;
		}else{
			if(posY < 0) posY = 0;
			if(posY + this.scrollBar.offsetHeight > this.scrolly.offsetHeight) posY = this.scrolly.offsetHeight-this.scrollBar.offsetHeight;
		}
		this.scrollBar.style.top = posY + "px";
		let size = this.scrolly.offsetHeight - this.scrollBar.offsetHeight;
		if(this.arrow){
			size -= this.upArrow.offsetHeight + this.downArrow.offsetHeight;
		}
		let place = this.scrollBar.offsetTop + this.scrollBar.offsetHeight/2;
		let dist = place - this.scrollBar.offsetHeight/2;
		if(this.arrow){
			dist -= this.upArrow.offsetHeight;
		}
		let perc = dist / size;
		let newPos = 0;
		if(this.scrollyHor !== null){
			if(this.element.getAttribute("scrolly-top") === null){
				newPos = (this.contain.offsetHeight - this.element.offsetHeight+this.scrollBarHor.offsetHeight) * -perc;
			}else{
				newPos = -perc*(this.contain.offsetHeight - this.element.offsetHeight) + this.scrollBarHor.offsetHeight*(1-perc);
			}
		}else{
			newPos = (this.contain.offsetHeight - this.element.offsetHeight) * -perc;
		}
		this.contain.style.top = newPos + "px";
	}

	scrollyHormove(posX){
		if(this.arrow){
			if(posX < this.leftArrow.offsetWidth) posX = this.leftArrow.offsetWidth;
			if(posX + this.scrollBarHor.offsetWidth > this.scrollyHor.offsetWidth - this.rightArrow.offsetWidth) posX = this.scrollyHor.offsetWidth - this.rightArrow.offsetWidth - this.scrollBarHor.offsetWidth;
		}else{
			if (posX < 0) posX = 0;
			if(posX + this.scrollBarHor.offsetWidth > this.scrollyHor.offsetWidth) posX = this.scrollyHor.offsetWidth - this.scrollBarHor.offsetWidth;
		}
		this.scrollBarHor.style.left = posX + "px";
		let size = this.scrollyHor.offsetWidth - this.scrollBarHor.offsetWidth;
		if(this.arrow){
			size -= this.rightArrow.offsetWidth + this.leftArrow.offsetWidth;
		}
		let place = this.scrollBarHor.offsetLeft + this.scrollBarHor.offsetWidth/2;
		let dist = place - this.scrollBarHor.offsetWidth/2;
		if(this.arrow){
			dist -= this.leftArrow.offsetWidth;
		}
		let perc = dist /size;
		let newPos = 0;
		if(this.scrolly !== null){
			if(this.element.getAttribute("scrolly-left") === null){
				newPos = (this.contain.offsetWidth - this.element.offsetWidth + this.scrollBar.offsetWidth) * -perc;
			}else{
				newPos = -perc * (this.contain.offsetWidth - this.element.offsetWidth) + this.scrollBar.offsetWidth * (1-perc);
			}
		}else{
			newPos = (this.contain.offsetWidth - this.element.offsetWidth) * -perc;
		}
		this.contain.style.left = newPos + "px";
	}

	moveDoc(event){
		if(this.isMoving){
			let myEvent = MoveEvent(event);
			let top = myEvent.pageY;
			top = top - this.element.offsetTop-this.scrollBar.offsetHeight/2;
			this.scrollyVermove(top);
		}else if(this.isMovingHor){
			let myEvent = MoveEvent(event);
			let left = myEvent.pageX;
			left = left - this.element.offsetLeft - this.scrollBarHor.offsetWidth/2;
			this.scrollyHormove(left);
		}
	}

	moveWheel(event){
		if(this.scrolly === null) return;
		let top = this.scrollBar.offsetTop + event.deltaY;
		this.scrollyVermove(top);
	}

	up(){
		if(this.scrolly === null) return;

		let top = this.scrollBar.offsetTop - 6;
		this.scrollyVermove(top);
	}	

	down(){
		if(this.scrolly === null) return;

		let top = this.scrollBar.offsetTop + 6;
		this.scrollyVermove(top);
	}

	left(){
		if(this.scrollyHor === null) return;
		let left = this.scrollBarHor.offsetLeft - 6;
		this.scrollyHormove(left);
	}

	right(){
		if(this.scrollyHor === null) return;

		let left = this.scrollBarHor.offsetLeft + 6;
		this.scrollyHormove(left);
	}

	load(){
		if(this.scrolly !== null){
			this.element.removeChild(this.scrolly);
		}
		if(this.scrollyHor !== null){
			this.element.removeChild(this.scrollyHor);
		}
		let clas = "default";
		if(this.element.getAttribute("Scrolly-Class") !== null){
			clas = this.element.getAttribute("Scrolly-Class");
		}
		let mycla = "Scrolly-" + clas;
		this.isMoving = false;
		this.isMovingHor = false;
		document.addEventListener("mousemove", (event) => {
			this.moveDoc(event);
		});
		this.element.addEventListener("wheel", (event) => {
			this.moveWheel(event);
		});
		let height = this.element.offsetHeight;
		let containHeight = this.element.childNodes[1].offsetHeight;
		this.contain = this.element.childNodes[1];

		if(containHeight > height){
			let d = document.createElement("div");
			let lid = document.createElement("div");
			d.appendChild(lid);
			if(this.arrow){
				let up = document.createElement("section");
				up.classList.add("Scrolly-UpArrow");
				let down = document.createElement("section");
				down.classList.add("Scrolly-DownArrow");
				d.appendChild(up);
				d.appendChild(down);
				up.addEventListener("click", this.up.bind(this));
				down.addEventListener("click", this.down.bind(this));
				this.upArrow = up;
				this.downArrow = down;
			}
			this.element.appendChild(d);
			d.classList.add(mycla);
			if(this.element.getAttribute("scrolly-left") !== null){
				d.style.left = "0";
				d.style.right = "auto";
			}
			this.scrolly = d;
			this.scrollBar = lid;
			this.scrollBar.style.height = height/(containHeight/height) + "px";
			if(this.arrow){
				this.scrollBar.style.top = this.upArrow.offsetHeight + "px";
			}
			this.contain.style.position = "absolute";
			this.scrollBar.addEventListener("mousedown", () => {
				window.addEventListener("selectstart", disableSelect);
				this.isMoving = true;
			});
			document.addEventListener("mouseup", () => {
				window.removeEventListener("selectstart", disableSelect);
				this.isMoving = false;
			});
		}else{
			this.scrolly = null;
		}
		if(this.element.getAttribute("scrolly-hor") !== null){
			let width = this.element.offsetWidth;
			let containWidth = this.element.childNodes[1].offsetWidth;
			if(containWidth > width){
				let d = document.createElement("div");
				let lid = document.createElement("div");
				d.appendChild(lid);
				if(this.arrow){
					let left = document.createElement("section");
					left.classList.add("Scrolly-LeftArrow");
					let right = document.createElement("section");
					right.classList.add("Scrolly-RightArrow");
					d.appendChild(left);
					d.appendChild(right);
					left.addEventListener("click", this.left.bind(this));
					right.addEventListener("click", this.right.bind(this));
					this.leftArrow = left;
					this.rightArrow = right;
				}
				this.element.appendChild(d);
				let thecla = "Scrolly-Hor-" + clas;
				d.classList.add(thecla);
				this.scrollyHor = d;
				this.scrollBarHor = lid;
				this.scrollBarHor.style.width = width/(containWidth/width) + "px";
				if(this.arrow){
					this.scrollBarHor.style.left = this.leftArrow.offsetWidth + "px";
				}
				if(this.element.getAttribute("scrolly-top") !== null){
					d.style.top = "0";
					d.style.bottom = "auto";
				}
				this.contain.style.position = "absolute";
				this.scrollBarHor.addEventListener("mousedown", () => {
					window.addEventListener("selectstart", disableSelect);
					this.isMovingHor = true;
				});
				document.addEventListener("mouseup", () => {
					window.removeEventListener("selectstart", disableSelect);
					this.isMovingHor = false;
				});
				//Reglage de la rencontre des sliders
				if(this.scrolly !== null){
					if(this.element.getAttribute("scrolly-top") !== null){
						this.scrolly.style.top = this.scrollyHor.offsetHeight + "px";
					}else{
						this.scrolly.style.bottom = this.scrollyHor.offsetHeight + "px";
					}
					if(this.element.getAttribute("scrolly-left") !== null){
						this.scrollyHor.style.left = this.scrolly.offsetWidth + "px";
					}else{
						this.scrollyHor.style.right = this.scrolly.offsetWidth + "px";
					}
				}
			}else{
				this.scrollyHor = null;
			}
		}
		if(this.scrolly !== null){
			this.positionVer();
		}
		if(this.scrollyHor !== null){
			this.positionHor();
		}
	}
}
//Version 1.1.1