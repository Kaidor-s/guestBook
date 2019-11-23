class GetInteractiveBackground{
	constructor(){
		this.content = document.getElementById('content');
		this.content.style.backgroundSize = this.sistemSearchWinSizeChanges.call(this);
		this.content.style.width = window.innerWidth;
	}

	// статические данные и их произведение
	static winSize = {
		w: window.innerWidth,
		h: window.innerHeight, 
		get getWinSize(){
			// console.log('ok', {w: window.innerWidth, h: window.innerHeight});
			let obj = {w: window.innerWidth, h: window.innerHeight};
			let descriptor = Object.getOwnPropertyDescriptor(GetInteractiveBackground.winSize, 'getWinSize');
			Object.defineProperty(obj, 'getWinSize', descriptor);

			return obj;
		},
	}
	static pointCenter = {
		x: window.innerWidth / 2, 
		y: window.innerHeight / 2,
		get getPointCenter(){
			// console.log('ok', {w: window.innerWidth, h: window.innerHeight});
			let obj = {x: window.innerWidth / 2, y: window.innerHeight / 2};
			let descriptor = Object.getOwnPropertyDescriptor(GetInteractiveBackground.pointCenter, 'getPointCenter');
			Object.defineProperty(obj, 'getPointCenter', descriptor);

			return obj;
		}
	}
	getMapBckgSize(){
		let bckgSize = this.content.style.backgroundSize.match(/\d+/ig);
		bckgSize = {x: Number(bckgSize[0]), y: Number(bckgSize[1])};
		let mapBckgSize = {x: (bckgSize.x - window.innerWidth) / 2 * -1, y: (bckgSize.y - window.innerHeight) / 2 * -1};

		return mapBckgSize;	
	}

	//дополнительно
	sistemSearchWinSizeChanges(){//система поиска изменений размера окна браузера(производит действия если изменения были обнаруженны)
		// '1650px 1100px'
		let interval = setInterval(function(){
			let mapBckgSize = this.getMapBckgSize();
			let winSize = GetInteractiveBackground.winSize.getWinSize;

			if (winSize.w != GetInteractiveBackground.winSize.w || winSize.h != GetInteractiveBackground.winSize.h) { 
				this.content.style.backgroundSize = `${window.innerHeight * 2 * 1.5}px ${window.innerHeight * 1.5}px`;

				this.content.classList.remove('content_animation');
				this.content.style.backgroundPosition = `${0}px ${0}px`;
			};

			GetInteractiveBackground.winSize = winSize;
		}.bind(this), 300);

		return `${window.innerHeight * 2 * 1.5}px ${window.innerHeight * 1.5}px`;
	}

	//главные процессы
	animation(x, y, pointCenter, mapBckgSize){//математическая функция анимации
		let indent = {x: pointCenter.x - x, y: pointCenter.y - y}; //отступ от центра
		let result = {x: mapBckgSize.x + indent.x, y: mapBckgSize.y + indent.y}; //(отступ от края фона до края окна браузера) + отступ от центра
			
		for(let key in result){ //если цифра ликом большая и пересекает пределы - изменяем ее до предела
			if( result[key] <= mapBckgSize[key]*2 ){ result[key] = mapBckgSize[key]*2; };
			if( result[key] >= 0 ){ result[key] = 0;};
		};

		this.content.style.backgroundPosition = `${result.x}px ${result.y}px`; //установка позиции фона в риалтайм
	}
	setBckgAnim(){//установка анимации
		let mapBckgSize = this.getMapBckgSize();

		function helper(){
			for(let key in mapBckgSize){
				if(mapBckgSize[key] > 0) return true;
			};
			return false;
		};

		if(helper()) {
			console.error('Ошибка настройки фонового изображения!');
		} else {
			this.content.classList.add('content_animation');
			this.content.style.backgroundPosition = `${mapBckgSize.x}px ${mapBckgSize.y}px`; //установка позиции фона впервые
			
			this.content.addEventListener('mousemove', function(event){
				if( !this.content.classList.contains("content_animation") ){ this.content.classList.add('content_animation'); };

				this.animation( 
					event.clientX,
					event.clientY,
					GetInteractiveBackground.pointCenter.getPointCenter,
					this.getMapBckgSize()
				);
			}.bind(this));
		};
	}
};

let interBckg = new GetInteractiveBackground();
interBckg = interBckg.setBckgAnim();