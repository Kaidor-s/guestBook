class GetInteractiveBackground{
	constructor(){
		this.content = document.getElementById('content');
		this.content.style.backgroundSize = '1650px 1100px';
	}

	animation(x, y, pointCenter, mapBckgSize){
		let indent = {x: pointCenter.x - x, y: pointCenter.y - y};
		let result = {x: mapBckgSize.x + indent.x, y: mapBckgSize.y + indent.y};
		for(let key in result){
			if( result[key] <= mapBckgSize[key]*2 ){ result[key] = mapBckgSize[key]*2; };
			if( result[key] >= 0 ){ result[key] = 0;};
		};

		this.content.style.backgroundPosition = `${result.x}px ${result.y}px`;
	}

	setBckgAnim(){
		let pointCenter = {x: window.innerWidth / 2, y: window.innerHeight / 2};
		
		let bckgSize = this.content.style.backgroundSize.match(/\d+/ig);
		bckgSize = {x: Number(bckgSize[0]), y: Number(bckgSize[1])};
		let mapBckgSize = {x: (bckgSize.x - window.innerWidth) / 2 * -1, y: (bckgSize.y - window.innerHeight) / 2 * -1};
		
		// костыли
		mapBckgSize.x = mapBckgSize.x + 20;

		console.log(mapBckgSize, window.innerWidth, window.innerHeight);

		if (function(){
			for(let key in mapBckgSize){
				if(mapBckgSize[key] > 0) return true;
			};
			return false;
		}()) {
			console.error('Ошибка настройки фонового изображения, поставьте фоновое изображение большего размера в соответствии с формулой *(размер изображения - размер экрана) / 2*!');
		} else {
			this.content.style.backgroundPosition = `${mapBckgSize.x}px ${mapBckgSize.y}px`;
			setTimeout( function(){this.content.classList.add('content_animation');}.bind(this));

			this.content.addEventListener('mousemove', function(event){
				this.animation( event.clientX, event.clientY, pointCenter, mapBckgSize) ;
			}.bind(this));
		};
	}
};

let interBckg = new GetInteractiveBackground();
interBckg = interBckg.setBckgAnim();