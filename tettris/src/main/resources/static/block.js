/*
 * Block 클래스 : block 모델은 관리하는 클래스
 * 
 */

export class Block {
	constructor() {
		this.blockType = {
		    type1 : {
		    	/* ㅣ,ㅡ */
		    	//stage 배열 인덱스 4부터 떨어짐
		    	blockArray : [
		    	    [[1,0],[1,1],[1,2],[1,3]], //ㅣ
		    	    [[0,0],[1,0],[2,0],[3,0]]  //ㅡ
		        ],
		        color : "blue"
		    },
		    
		    type2 : {
		    	/* ㄴ */
		    	blockArray : [
		    	    [[1,0],[1,1],[2,1],[3,1]],  //ㄴ
		    	    [[1,0],[2,0],[1,1],[1,2]], //┌
		    	    [[1,0],[2,0],[3,0],[3,1]], //┐
		    	    [[2,0],[2,1],[2,2],[1,2]]  //┘
		        ],
		        color : "red"
		    },
		    /* ㄴ2 */
		    type3 : {
		    	blockArray : [
		            [[3,0],[3,1],[2,1],[1,1]], //┘
		            [[1,0],[1,1],[1,2],[2,2]], //└
		            [[1,0],[1,1],[2,0],[3,0]], //┌
		            [[1,0],[2,0],[2,1],[2,2]]
		        ],
		        color : "green"
		    },
		    /* ㅁ */
		    type4 : {
		    	blockArray : [
		    	    [[1,0],[2,0],[1,1],[2,1]] //ㅁ
		        ],
		        color : "orange"
		    },
		    /* ㄹ */
		    type5 : {
		    	blockArray : [
		    	    [[1,0],[2,0],[2,1],[3,1]],
		    	    [[2,0],[2,1],[1,1],[1,2]]
		        ],
		        color : "yellow"
		    },
		    /* ㄹ2 */
		    type6 : {
		    	blockArray : [
		            [[2,0],[3,0],[1,1],[2,1]],
		            [[1,0],[1,1],[2,1],[2,2]]
		        ],
		        color : "purple"
		    },
		    /* ㅗ */
		    type7 : {
		    	blockArray : [
		            [[2,0],[1,1],[2,1],[3,1]], //ㅗ
		            [[2,0],[2,1],[1,1],[2,2]], //ㅓ
		            [[1,0],[2,0],[3,0],[2,1]], //ㅜ
		            [[1,0],[1,1],[1,2],[2,1]] //ㅏ
		        ],
		        color : "pink"
		    }
		}
	}
	
	getNewBlockObject() {
		return new Block();
	}
	
	getNextBlock() {
		let key = Object.keys(this.blockType)[Math.floor(Math.random() * Object.keys(this.blockType).length)];
		let nextBlock = this.blockType[key];
		
		return nextBlock
	}
}