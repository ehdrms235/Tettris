export class BlockState {
	constructor(block) {
		this.block = block;
		this.cell = 25;
		this.cellWidthNum = 10;
		this.cellHeightNum = 20;
		this.startIndex = 3;
		this.stageArray = null;
		this.index = 1;
	}
	
	//stage 배열 초기화
	clearArray() { 
		this.stageArray = Array.from(Array(this.cellHeightNum), () => Array(this.cellWidthNum).fill(0));
		return this.stageArray;
	}
	
	blockMove(currentBlock, pressType, beforeBlock) {
		let updtBlock;
		
		switch (pressType) {
		case "LEFT":
			updtBlock = currentBlock.map(item => {
				return [item[0] - 1, item[1]];
			});
			break;
		case "RIGHT":
			updtBlock = currentBlock.map(item => {
				return [item[0] + 1, item[1]];
			});
			break;
		case "DOWN":
			updtBlock = currentBlock.map(item => {
				return [item[0], item[1] + 1];
			});
			break;
			
		case "ROTATE":
			if (currentBlock.blockArray.length <= this.index) {
				this.index = 0;
			}
			
			let fallX = beforeBlock[0][0] - currentBlock.blockArray[0][0][0];
			let fallY = beforeBlock[0][1] - currentBlock.blockArray[0][0][1];
			
			updtBlock = currentBlock.blockArray[0 + this.index].map(item => {
				return [item[0] + fallX , item[1] + fallY];
			});
			this.index++;

			break;
			
		case "spacebar":
			let max = Math.max(...currentBlock.map((elem) => elem[1]));
			let index = this.cellHeightNum - max - 1;
			let line;
			
			console.log(this.stageArray);
			console.log(currentBlock);
			console.log("max", max);
			
			/*
			 * 
			 */
			
			updtBlock = currentBlock.map(item => {
				return [item[0], item[1] + index];
			});
			
			break;
		}
		
		return updtBlock;
	}
	
	//stage배열 초기화
	updateStageArray(beforeBlock, currentBlock) {
		//stage배열에서 이전블록 위치 0으로 채움
		for (let i=0 ; i<currentBlock.length; i++) {
			this.stageArray[beforeBlock[i][1]][beforeBlock[i][0] + this.startIndex] = 0;
		}
		
		//stage배열에서 현재블록 위치 1로 채움
		for (let j=0; j<currentBlock.length; j++) {
			this.stageArray[currentBlock[j][1]][currentBlock[j][0] + this.startIndex] = 1;
		}
		return this.stageArray;
	}
	
	isBlockFloorCheck(currentBlock) {
		let flag = false;
		
		//바닥에 닿았을 때
		for (let i=0; i<currentBlock.length; i++) {
			for (let j=0; j<currentBlock[0].length; j++) {
				if (currentBlock[i][1] == this.cellHeightNum - 1) {
					for (let k=0; k<currentBlock.length; k++) {
						this.stageArray[currentBlock[k][1]][currentBlock[k][0] + this.startIndex] = "FIX";
					}
					
					flag = true;
					return flag;
				}
			}
		}
		//블록끼리 만났을 때
		for (let j=0; j<currentBlock.length; j++) {
			if (this.stageArray[currentBlock[j][1] + 1][currentBlock[j][0] + this.startIndex] == "FIX") {
				for (let k=0; k<currentBlock.length; k++) {
					this.stageArray[currentBlock[k][1]][currentBlock[k][0] + this.startIndex] = "FIX";
				}
				
				flag = true;
				return flag;
			}
		}
		
		return flag;
	}
	
	//블록 삭제
	blockLineCheck() {
		//지울 블록 라인 수
		let deleteLineArr = [];
		
		for (let i=this.cellHeightNum - 1; i>0; i--) {
			if (!this.stageArray[i].includes(0)) {
				deleteLineArr.push(i);
			}
		}
		return deleteLineArr;
	}
	
	deleteLineFix(deleteLineArr) {
		
		console.log(this.stageArray);
		console.log(deleteLineArr);
		debugger;
		
		for (let i=0; i<deleteLineArr.length; i++) {
			this.stageArray.splice(deleteLineArr[i], 1);
			let newArr = new Array(10).fill(0);
			this.stageArray.unshift(newArr);
		}
	}

}