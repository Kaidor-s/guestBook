class CreateInfoBlock{
	constructor(){
		let infoB_content = document.createElement('div');
		infoB_content.classList.toggle('infoB_content_animationStart'); //по умолчанию ставится класс при котором блок в самом верху за экраном
		infoB_content.id = 'infoB_content';
		this.infoB_content = {
			adress: document.body,
			elem: infoB_content,
			styleClass: 'infoB_content_animationStart',
			styleClass_animation: 'infoB_content_animationEnd',
		};

		let infoB_header = document.createElement('p');
		infoB_header.id = 'infoB_header';
		infoB_header.classList.toggle('infoB_elemsContent_animationStart');
		this.infoB_header = {
			adress: infoB_content,
			elem: infoB_header,
			styleClass: 'infoB_elemsContent_animationStart',
			styleClass_animation: 'infoB_elemsContent_animationEnd',
		};

		let infoB_text = document.createElement('p');
		infoB_text.id = 'infoB_text';
		infoB_text.classList.toggle('infoB_elemsContent_animationStart');
		this.infoB_text = {
			adress: infoB_content,
			elem: infoB_text,
			styleClass: 'infoB_elemsContent_animationStart',
			styleClass_animation: 'infoB_elemsContent_animationEnd',
		};

		let infoB_gitLink = document.createElement('a');
		infoB_gitLink.id = 'infoB_gitLink';
		infoB_gitLink.innerHtml = "<span class='gitTitle'>GitHub</span><img src='client/css/icons/github_icons.png' alt='github'>"
		infoB_gitLink.classList.toggle('infoB_elemsContent_animationStart');
		this.infoB_gitLink = {
			adress: infoB_content,
			elem: infoB_gitLink,
			styleClass: 'infoB_elemsContent_animationStart',
			styleClass_animation: 'infoB_elemsContent_animationEnd',
		};
	};

	setBlock(){
		let timeout = undefined; 

		if ( document.getElementById( this.infoB_content.elem.id ) != undefined ) {
			this.animation();	
		} else {
			this.animation( function(){
				for(let keyClass in this){
					this[keyClass].adress.appendChild(this[keyClass].elem);
				};
			}.bind(this) );	
		};
	}

	animation(func){
		let timeoutVal = undefined;

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
			timeoutVal = setTimeout(function() {
				process.call(this);
			}.bind(this), 500);
			CreateInfoBlock.flag_setInfoBlock = true;
		}else {
			clearTimeout(timeoutVal);
			process.call(this);
		};
	}
};
CreateInfoBlock.flag_setInfoBlock = false;

let buttonInfo = document.getElementById('info');
buttonInfo.onclick = function(){
	let infoBlock = new CreateInfoBlock();
	infoBlock = infoBlock.setBlock();
}; 