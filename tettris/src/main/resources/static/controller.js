import {
	View
} from "./view.js"

import {
	Block
} from './block.js'

import {
	BlockState
} from './blockState.js'

import {
	Util
} from './util.js'

class Controller {
	constructor() {
		//인스턴스 초기화
		this.block = new Block();
		this.blockState = new BlockState(this.block);
		this.view = new View(this.blockState);
		this.util = new Util();
		
		this.blockInstance = null;
		this.stageArray = null;
		this.cBlockObject = null;
		//다음 블록 세팅을 구분하는 플래그 (바닥에 닿았을 때, 블록끼리 닿았을 떄)
		this.flag = true;
		//현재 블록
		this.currentBlock = null;
		//현재 블록상태를 업데이트 하기전의 블록
		this.beforeBlock = null;
		//현재 블록의 색상
		this.currentBlockColor = null;
		this.speed = 1000;
		this.score = 0;
		
	}
	start () {
		//stage배열 초기화
		this.stageArray = this.blockState.clearArray();
		//블록 세팅
		this.currentBlock = this.getBlockInstance();
		
		let interval = () => {
			
			//현재 블록이 바닥에 닿았는지 검사
			if (this.blockState.isBlockFloorCheck(this.currentBlock)) {
				//바닥에 닿았으면 라인 검사
				let deleteLineArr = this.blockState.blockLineCheck();
				
				if (deleteLineArr.length != 0) {
					this.view.renderBlock(deleteLineArr);
					this.stateArray = this.blockState.deleteLineFix(deleteLineArr);
					
					this.score = this.score + (deleteLineArr.length * 10);
					this.scorePlus();
					
				}
				deleteLineArr = [];
				//닿았으면 다음블록 세팅
				this.currentBlock = this.getBlockInstance();
			}
			
			//바닥에 닿지 않았을 경우 현재 블록을 아래로 1칸이동
			this.beforeBlock = this.util.assignBlock(this.currentBlock);
			this.currentBlock = this.blockState.blockMove(this.currentBlock, "DOWN");
			
			//화면에  랜더링
			this.view.renderBlock(this.currentBlock, this.beforeBlock, this.currentBlockColor);
			//stage배열 업데이트
			this.stageArray = this.blockState.updateStageArray(this.beforeBlock, this.currentBlock);
			setTimeout(interval, this.speed);
		}

		interval();
		
		window.addEventListener("keydown", (e) => {
			let keyCode = e.keyCode;
			this.keyEvent(keyCode)
		});
	}
	
	getBlockInstance() {
		this.blockInstance = this.block.getNewBlockObject().getNextBlock();
		this.currentBlockColor = this.blockInstance.color;
		
		return this.blockInstance.blockArray[0];
	}
	
	scorePlus() {
		let scoreElement = document.getElementById("score");
		scoreElement.innerHTML = this.score;
	}
	
	keyEvent(keyCode) {
		let pressType = null;
		this.beforeBlock = this.util.assignBlock(this.currentBlock);
		
		switch (keyCode) {
		case 37:
			pressType = "LEFT";
			break;
		case 38:
			pressType = "ROTATE";
			break;
		case 39:
			pressType = "RIGHT";
			break;
		case 40:
			pressType = "DOWN";
			break;
		case 32:
			pressType = "spacebar";
			break;
		}
		
		if (pressType == "ROTATE") {
			this.currentBlock = this.blockState.blockMove(this.blockInstance, pressType, this.beforeBlock);
			this.stageArray = this.blockState.updateStageArray(this.beforeBlock, this.currentBlock);
			this.view.renderBlock(this.currentBlock, this.beforeBlock, this.currentBlockColor);
			
		} else {
			this.currentBlock = this.blockState.blockMove(this.currentBlock, pressType);
			this.stageArray = this.blockState.updateStageArray(this.beforeBlock, this.currentBlock, pressType);
			this.view.renderBlock(this.currentBlock, this.beforeBlock, this.currentBlockColor);
		}
		
	}
	
}


//시작
(function() {
	return {
		init() {
			let controller = new Controller();
			controller.start();
		}
		
	}
})().init();

