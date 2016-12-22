(()=>{
	"use strict"
	const prefixfree = require('./prefixfree.min.js')
	const content = require('./content')
	const linkTypes = {
		lead: 'cc-displayLink',
		reg: 'cc-regularLink'
	}

	let isMobileDevice = ()=> {
		let mobile = /iPad|Android|webOS|iPhone|iPod|Blackberry/.test(navigator.userAgent) && !window.MSStream;
		return mobile ? true : false
	}

	let isPastDate = (date)=>{
		console.log('checking dates')
		let d = new Date()
		let today = [d.getFullYear(), d.getMonth(), d.getDate()]
		console.log(today.join(''), date.join(''))
		if (today.join('') >= date.join('')){
			return true
		} else {
			return false
		}
	}
	
	const templateTitleBlcok = ()=>{
		return `
			<div id="cc-titleBlockContainer">
				<h2>${content.introBlock.title}</h2>
				<p>${content.introBlock.intro}</p>
			</div>
		`
	}

	const cardTextContainer = (props)=>{
		return `<div class="cc-contentContainer" style="background-image: url(../images/${props.image})">
			<div class="cc-textContainer">
				<div class='cc-kicker'>${props.kicker}</div>
				<h3>${props.title}</h3>
				<p>${props.text}</p>
			</div>	
		</div>`
	}



	const templateLinkContainer = (props, type)=>{
		if (isPastDate(props.liveDate)){
			return `<a class="cc-linkContainer ${type} ${!isMobileDevice()?'isDesktop':'isMobile'} cc-active" 
					href="${props.storyid}" target="_self" rel="noopener noreferrer">
					${cardTextContainer(props)}
				</a>
			`
		} else {
			return `<div class="cc-linkContainer ${type} ${!isMobileDevice()?'isDesktop':'isMobile'} cc-innactive">
					${cardTextContainer(props)}
				</div>
			`
		}
		
	}


	let createMainLink = (article)=>{
		if (!!article){
			return templateLinkContainer(content.articles[article], linkTypes.lead)
		} else {
			return ''	
		}
	}

	let createRegularLinks = (props)=>{
		let articleList = Object.keys(props)
		let regularLinks = articleList.map(article=>{
			if ( [config.hero, config.hide].indexOf(article) === -1 ){
				let articleContent = content.articles[article]
				return templateLinkContainer(articleContent, linkTypes.reg)
			} else {
				return ''
			}	
		}).join('')
		console.log(regularLinks)
		return `<div id="cc-regularLinksContainer">${regularLinks}</div>`

	}



	document.getElementById('cc-extralinks_app_container').innerHTML = [ 
		templateTitleBlcok(),
		createMainLink(config.hero), 
		createRegularLinks( content.articles ) 
	].join('')



})()