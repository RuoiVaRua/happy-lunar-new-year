export class HappyNewYear 
{
	private happyNewYearWordPositions = [153,156,159,160,163,164,165,168,169,170,173,175,183,186,188,191,193,196,198,201,203,205,213,214,215,216,218,219,220,221,223,224,225,228,229,230,234,243,246,248,251,253,258,264,273,276,278,281,283,288,294,398,401,403,404,405,407,411,428,429,431,433,437,441,458,460,461,463,464,467,469,471,488,491,493,497,499,501,518,521,523,524,525,528,530,637,639,641,642,643,646,647,650,651,652,667,669,671,675,678,680,683,697,698,699,701,702,705,706,707,708,710,711,712,728,731,735,738,740,743,758,761,762,763,765,768,770,773]
	private snakeBlackPositions = [192,193,194,195,196,221,227,250,252,256,258,280,282,286,288,310,318,341,342,343,345,346,347,372,376,402,406,429,430,431,432,436,437,438,458,462,466,469,487,490,491,496,499,516,525,530,545,555,560,574,576,584,590,604,607,613,619,634,638,639,640,641,642,648,650,664,677,681,695,706,707,712,713,714,726,733,734,735,738,739,745,757,758,759,760,761,762,770,771,772,773,774]
	private snakeBrownPositions = [222,223,224,225,226,251,253,254,255,257,283,284,285,459,460,461,467,468,488,489,492,497,498,517,518,519,520,521,522,526,527,528,529,547,548,549,550,551,556,557,558,559,575,578,579,585,586,587,588,605,606,614,615,616,617,635,636,637,643,644,645,646,649,666,667,668,669,670,671,672,673,674,675,678,679,680,697,698,699,700,701,702,709,710,711,741,742,743,744]
	private snakeTanPositions = [281,287,311,312,313,314,315,316,317,373,375,403,405,433,434,435,463,464,465,493,494,495,523,524,546,552,553,554,577,580,581,582,583,589,608,609,610,611,612,618,647,665,676,696,703,704,705,708,727,728,729,730,731,732,740]
	private snakeRedPositions = [344,374,404]
	private board:HTMLElement

	constructor(boardElement: HTMLElement) 
	{
		this.board = boardElement;
	}

	public displayHappyNewYearWords(): Promise<boolean>
	{
		return new Promise((resolve, _reject) => {
			let count = 0;
			if (this.board) {
				Array.from(this.board.childNodes).forEach((node: Element, index: number) => {
					node.className = '';
					if (this.happyNewYearWordPositions.includes(index)) {
						count++;
						setTimeout(() => {
							node.classList.add('word');

							if (this.happyNewYearWordPositions.indexOf(index) === this.happyNewYearWordPositions.length - 1) {
								setTimeout(() => {
									const words = Array.from(document.getElementsByClassName('word'));
									words.forEach(word => word.classList.add('flash'))
								}, 1500);
								
								setTimeout(() => {
									resolve(true);
								}, 3000);	
							}
						}, 30 * count);
					}
				})
			}
		})
	}

	private timeoutAddClass(className: string, node: HTMLElement, count: number)
	{
		count++;
		setTimeout(() => {
			node.className = '';
			node.classList.add(className);
		}, 20 * count);	
		return count;	
	}

	public shuffleArray(array: any[]) 
	{
		const shuffledArray = [...array];
		for (let i = shuffledArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
		}
		return shuffledArray;
	}	

	public displaySnake(): Promise<boolean>
	{
		return new Promise((resolve, _reject) => {
			let count = 0;
			if (this.board) {
				const snakePositionIndexes = this.shuffleArray(Array.from(Array(900).keys()));
				snakePositionIndexes.forEach((index: number, i: number) => {
					const node = Array.from(this.board.childNodes)[index] as HTMLElement;
					node.classList.remove('flash');
					
					if (this.snakeBlackPositions.includes(index)) {
						count = this.timeoutAddClass('black', node, count);
					}
					else if (this.snakeBrownPositions.includes(index)) {
						count = this.timeoutAddClass('orange', node, count);
					}
					else if (this.snakeTanPositions.includes(index)) {
						count = this.timeoutAddClass('tan', node, count);
					}
					else if (this.snakeRedPositions.includes(index)) {
						count = this.timeoutAddClass('red', node, count);
					}
					else {
						node.className = '';
					}

					if (i === snakePositionIndexes.length - 1) {
						setTimeout(() => {
							const colors = Array.from(document.querySelectorAll('.black, .orange, .tan, .red'));
							colors.forEach(color => color.classList.add('flash'))
						}, 20 * count + 3000);						
						setTimeout(() => {
							resolve(true);
						}, 20 * count + 5000);
					}
				})
			}
		})
	}	
}