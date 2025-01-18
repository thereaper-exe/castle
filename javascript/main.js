document.addEventListener('DOMContentLoaded', function () {
	let currentMember = null
	const audioPlayer = document.getElementById('audio')

	const memberInfoData = {
		Arterial: {
			name: 'Arterial',
			image: './images/reaper.jpg',
			description: `balenciaga and vetements. nothing else.`,
			track: './music/Playboi Carti - Evil Jordan.mp3',
			trackphoto: './images/iammusic.jpg',
			trackname: 'Playboi Carti - Evil Jordan',
			links: `
        <img src="./icons/telegram.png" style="width: 24px; height: 24px; margin: 5px 5px -3px;"><a href="#" target="_blank">@undefined</a>
        <img src="./icons/telegram.png" style="width: 24px; height: 24px; margin: 5px 5px -3px;"><a href="#" target="_blank">@undefined</a>
      `,
		},
		Reaper: {
			name: 'The Reaper',
			image: './images/attack.jpg',
			description: `keep your mind humans...`,
			track: './music/xcxel - Wanted You But Never Mind.mp3',
			trackphoto: './images/xcxel_photo.png',
			trackname: 'xcxel - Wanted You But Never Mind',
			links: `
        <img src="./icons/instagram.png" style="width: 24px; height: 24px; margin: 5px 5px -3px;"><a href="https://instagram.com/thereaper.exe" target="_blank">@thereaper.exe</a>
        <img src="./icons/telegram.png" style="width: 24px; height: 24px; margin: 5px 5px -3px;"><a href="https://t.me/coldzeraa" target="_blank">@coldzeraa</a>
			`,
		},
	}

	const defaultMembersHTML = document.querySelector(
		'.container .members'
	).innerHTML

function showMember(member) {
	const info = memberInfoData[member]
	if (!info) return

	const memberContainer = document.querySelector('.container .members')
	const selectedElement = document.querySelector(
		`[onclick="showMember('${member}')"]`
	)

	if (currentMember) {
		currentMember.classList.remove('selected')
		resetDot(currentMember.getAttribute('data-member'))
	}

	if (selectedElement) {
		selectedElement.classList.add('selected')
		selectedElement.setAttribute('data-member', member)
		currentMember = selectedElement
	}

	updateDots(member)

	memberContainer.innerHTML = `
    <div id="member-info" style="display: flex; flex-direction: column; align-items: center; gap: 20px; color: #ffffff; margin-top: 30px; margin: 0 auto;">
      <img src="${info.image}" alt="${info.name}" style="width: 150px; height: 150px; border-radius: 50%;" draggable="false">
      <h2 style="margin: 0; font-size: 24px;">[ ${info.name} ]</h2>
      <p class="glitch" id="description-text" style="text-align: center; margin: 10px 0; font-size: 18px;"></p>
      <div style="display: flex; align-items: center; gap: 10px; margin: 10px 0; font-size: 16px;">
        <img src="${info.trackphoto}" alt="Track Photo" style="width: 40px; height: 40px; border-radius: 5px;" draggable="false">
        <strong>Track:</strong> ${info.trackname}
      </div>
      <div>${info.links}</div>
      <button class="transparent-button" onclick="hideMember()">
        Hide Member
      </button>
    </div>
  `

	typeDescription(info.description, 'description-text')
	playMemberMusic(info.track)
}


	function hideMember() {
		const memberContainer = document.querySelector('.container .members')
		memberContainer.innerHTML = defaultMembersHTML
		resetMusic()
		if (currentMember) {
			currentMember.classList.remove('selected')
			resetDot(currentMember.getAttribute('data-member'))
			currentMember = null
		}
	}

	function typeDescription(text, elementId) {
		const element = document.getElementById(elementId)
		let index = 0

		function typeNextChar() {
			if (index < text.length) {
				element.innerHTML += text[index]
				index++
				setTimeout(typeNextChar, 50)
			}
		}

		typeNextChar()
	}

	function playMemberMusic(track) {
		if (audioPlayer.src !== track) {
			audioPlayer.src = track
			audioPlayer.play()
		}
	}

	function resetMusic() {
		const defaultTrack = '/music/scaryzone.mp3'
		if (audioPlayer.src !== defaultTrack) {
			audioPlayer.src = defaultTrack
			audioPlayer.play()
		}
	}

	function resetDot(memberId) {
		const previousDot = document.querySelector(`#${memberId}-dot`)
		if (previousDot) previousDot.innerHTML = '::'
	}

	function updateDots(member) {
		document.querySelectorAll('.yellow').forEach(dot => {
			dot.innerHTML = '::'
		})
		const currentDot = document.querySelector(`#${member}-dot`)
		if (currentDot) {
			currentDot.innerHTML =
				'<span style="color: #8a0000; margin-top: -2px;">&bull;</span>'
		}
	}

	const overlay = document.getElementById('overlay')

	function removeOverlay() {
		overlay.style.display = 'none'
		audioPlayer.play()
	}

	window.showMember = showMember
	window.hideMember = hideMember
	window.removeOverlay = removeOverlay
})
