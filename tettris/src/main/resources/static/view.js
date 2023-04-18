export class View {
	constructor(blockState) {
		this.stageElement = document.getElementById("stage");
		this.context = this.stageElement.getContext("2d");
		this.blockState = blockState
		this.nextBlock = null;
	}
	
	renderBlock(currentBlock, beforeBlock, currentBlockColor) {
		if (typeof arguments[0][0] != "object") {
			let deleteBlockArr = arguments[0];
			
			for (let i=0; i<deleteBlockArr.length; i++) {
				for (let j=0; j<10; j++) {
					this.context.fillStyle = "black";
					this.context.fillRect(
							this.blockState.cell * j,
							this.blockState.cell * deleteBlockArr[i],
							this.blockState.cell,
							this.blockState.cell,
					)
				}
			}
			let downLine = deleteBlockArr[0] - deleteBlockArr.length;
			
			for (let i=0; i<deleteBlockArr.length; i++) {
				for (let j=downLine; j>0; j--) {
					const topImageData = this.context.getImageData(0, j * this.blockState.cell, this.blockState.cellWidthNum * this.blockState.cell, this.blockState.cell);
					this.context.putImageData(topImageData, 0, (j+1) * this.blockState.cell)
				}
				downLine+=1;
			}
		}
		
		for (let i in beforeBlock) {
			this.context.fillStyle = "black";
			this.context.fillRect(
					this.blockState.cell * (beforeBlock[i][0] + this.blockState.startIndex),
					this.blockState.cell * (beforeBlock[i][1]),
					this.blockState.cell,
					this.blockState.cell	
			);
		}
		for (let j in currentBlock) {
			this.context.fillStyle = currentBlockColor;
			this.context.fillRect(
					this.blockState.cell * (currentBlock[j][0] + this.blockState.startIndex),
					this.blockState.cell * (currentBlock[j][1]),
					this.blockState.cell,
					this.blockState.cell
			)
			this.context.strokeRect(
					this.blockState.cell * (currentBlock[j][0] + this.blockState.startIndex),
					this.blockState.cell * (currentBlock[j][1]),
					this.blockState.cell,
					this.blockState.cell);
		}
	}
}