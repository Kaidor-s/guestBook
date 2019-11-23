class CreateInfoBlock{
	constructor(){
		let infoB_content = document.createElement('div');
		infoB_content.classList.toggle('infoB_content_animationStart'); //по умолчанию ставится класс при котором блок в самом верху за экраном
		infoB_content.id = 'infoB_content';
		
		//декорации
		let threadLeft = document.createElement('img');
		threadLeft.id = 'threadLeft';
		threadLeft.className = 'thread';
		threadLeft.src = 'client/css/backgrounds/thread.png';
		threadLeft.classList.toggle('infoB_content_animationStart');
		this.threadLeft = {
			adress: document.body,
			elem: threadLeft,
			styleClass: 'infoB_content_animationStart',
			styleClass_animation: 'infoB_content_animationEnd',
		};
		let threadRight = document.createElement('img');
		threadRight.id = 'threadRight';
		threadRight.className = 'thread';
		threadRight.src = 'client/css/backgrounds/thread.png';
		threadRight.classList.toggle('infoB_content_animationStart');
		this.threadRight = {
			adress: document.body,
			elem: threadRight,
			styleClass: 'infoB_content_animationStart',
			styleClass_animation: 'infoB_content_animationEnd',
		};

		// контент
		this.infoB_content = {
			adress: document.body,
			elem: infoB_content,
			styleClass: 'infoB_content_animationStart',
			styleClass_animation: 'infoB_content_animationEnd',
		};

		// дочение элементы
		let infoB_header = document.createElement('p');
		infoB_header.id = 'infoB_header';
		infoB_header.innerText = 'О САЙТЕ';
		infoB_header.classList.toggle('infoB_elemsContent_animationStart');
		this.infoB_header = {
			adress: infoB_content,
			elem: infoB_header,
			styleClass: 'infoB_elemsContent_animationStart',
			styleClass_animation: 'infoB_elemsContent_animationEnd',
		};
		let infoB_text = document.createElement('p');
		infoB_text.id = 'infoB_text';
		infoB_text.innerHTML = "<p><span>Автор:</span> <br>Кайдор Саервис</p><p><span>Возможности:</span> <br>Сайт позволяет добавлять отзывы пользователей. Для добавления отзыва нужно придумать себе имя и указать почту. После чего ваш отзыв будет демонстрироваться на главном экране проекта.</p><p><span>Связаться с автором:</span> <br>askme3714@mail.ru</p><p><span>Покормить Кайда печенькой:</span> <br>4276600028473854</p>";
		infoB_text.classList.toggle('infoB_elemsContent_animationStart');
		this.infoB_text = {
			adress: infoB_content,
			elem: infoB_text,
			styleClass: 'infoB_elemsContent_animationStart',
			styleClass_animation: 'infoB_elemsContent_animationEnd',
		};
		let infoB_gitLink = document.createElement('a');
		infoB_gitLink.id = 'github';
		infoB_gitLink.href = 'https://github.com/Kaidor-s/guestBook';
		infoB_gitLink.target = '_blank';
		infoB_gitLink.innerHTML = "<span class='gitTitle'>GitHub</span><img src='client/css/icons/github_icons.png' alt='github'>"
		infoB_gitLink.classList.toggle('infoB_elemsContent_animationStart');
		this.infoB_gitLink = {
			adress: infoB_content,
			elem: infoB_gitLink,
			styleClass: 'infoB_elemsContent_animationStart',
			styleClass_animation: 'infoB_elemsContent_animationEnd',
		};
	};
	clearElems(){
		for(let key in this){
			if( document.getElementById(this[key].adress.id) != null ){
				if(this[key].adress == document.body){
					this[key].adress.removeChild( this[key].elem );
				};
			};
		};
	}


	sistemSearchWinSizeChanges(func){
		let interval = setInterval(function(){
			if (winSize.w != GetInteractiveBackground.winSize.w || winSize.h != GetInteractiveBackground.winSize.h) {
				func();
			};
		}.bind(this), 300);
	}


	setBlock(){
		let timeout = undefined; 

		if ( document.getElementById( this.infoB_content.elem.id ) != undefined ) { //если есть инфоблок - просто возвращает его
			this.animation();	
		} else {
			this.animation( function(){ //если его нет
				for(let keyClass in this){
					this[keyClass].adress.appendChild(this[keyClass].elem);
				};
			}.bind(this) );	
		};
	}


	animation(func){
		if(func != undefined){
			func()
		};

		function process(){
			for(let keyClass in this){
				if(this[keyClass].styleClass_animation != undefined){
					document.getElementById( this[keyClass].elem.id ).classList.toggle( this[keyClass].styleClass );
					document.getElementById( this[keyClass].elem.id ).classList.toggle( this[keyClass].styleClass_animation );
				};
			};
		};

		if ( CreateInfoBlock.flag_setInfoBlock == false ) {
			setTimeout(function() {
				process.call(this);

				CreateInfoBlock.flag_setInfoBlock = true;
			}.bind(this), 200);
		}else {
			setTimeout(function() {
				process.call(this);

				CreateInfoBlock.flag_setInfoBlock = false;	
			}.bind(this), 200);

			setTimeout(function(){
				if (CreateInfoBlock.flag_setInfoBlock == false) {
					this.clearElems();
				};
			}.bind(this), 1500)
		};
	}
};
CreateInfoBlock.flag_setInfoBlock = false;

let buttonInfo = document.getElementById('info');
buttonInfo.onclick = function(){
	let infoBlock = new CreateInfoBlock();
	infoBlock = infoBlock.setBlock();
}; 