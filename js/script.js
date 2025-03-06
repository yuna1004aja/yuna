// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    // 필요한 DOM 요소 가져오기
    const collageContainer = document.getElementById('collage-container');
    const resetBtn = document.getElementById('reset-btn');
    const addBtn = document.getElementById('add-btn');
    const pieceSlider = document.getElementById('piece-slider');
    const pieceCount = document.getElementById('piece-count');
    
    // 콜라주 설정
    let currentPieceCount = 15; // 기본 조각 수
    const originalWidth = 800; // 원본 이미지 너비
    const originalHeight = 800; // 원본 이미지 높이
    
    // 흰색 여백을 피하기 위한 영역 설정 (중앙 80%만 사용)
    const safeArea = {
        left: originalWidth * 0.1,    // 좌측 10% 피함
        top: originalHeight * 0.1,    // 상단 10% 피함
        right: originalWidth * 0.9,   // 우측 10% 피함
        bottom: originalHeight * 0.9  // 하단 10% 피함
    };
    
    // 콜라주 조각 스타일 배열
    const pieceStyles = ['piece-style1', 'piece-style2', 'piece-style3', 'piece-style4', 'piece-style5'];
    const borderStyles = ['border-white', 'border-gold', 'border-blue', ''];
    const rotateStyles = ['rotate-slight', 'rotate-medium', 'rotate-large', ''];
    const cutEdgeStyles = ['cut-edge', 'cut-edge2', 'cut-edge3', 'cut-edge4', 'cut-edge5', ''];
    
    // 슬라이더 값 변경 시 조각 수 업데이트
    pieceSlider.addEventListener('input', function() {
        currentPieceCount = parseInt(this.value);
        pieceCount.textContent = currentPieceCount + ' pieces';
    });
    
    // 안전 영역 내 랜덤 위치 생성 함수
    function getRandomSafePosition(width, height) {
        // 안전 영역 내에서 랜덤 위치 생성
        const left = Math.floor(Math.random() * (safeArea.right - safeArea.left - width) + safeArea.left);
        const top = Math.floor(Math.random() * (safeArea.bottom - safeArea.top - height) + safeArea.top);
        
        return { left, top };
    }
    
    // 랜덤 스타일 클래스 선택 함수
    function getRandomStyleClasses() {
        return {
            pieceStyle: pieceStyles[Math.floor(Math.random() * pieceStyles.length)],
            borderStyle: borderStyles[Math.floor(Math.random() * borderStyles.length)],
            rotateStyle: rotateStyles[Math.floor(Math.random() * rotateStyles.length)],
            cutEdgeStyle: cutEdgeStyles[Math.floor(Math.random() * cutEdgeStyles.length)]
        };
    }
    
    // 콜라주 생성 함수
    function createCollage() {
        // 기존 조각 제거
        collageContainer.innerHTML = '';
        
        // 새 콜라주 조각 생성
        for (let i = 0; i < currentPieceCount; i++) {
            createCollagePiece();
        }
    }
    
    // 개별 콜라주 조각 생성 함수
    function createCollagePiece() {
        // 새 조각 요소 생성
        const piece = document.createElement('div');
        piece.className = 'collage-piece';
        
        // 랜덤 크기 (원본의 15%~25% 사이)
        const width = Math.floor(originalWidth * (0.15 + Math.random() * 0.1));
        const height = Math.floor(originalHeight * (0.15 + Math.random() * 0.1));
        
        // 안전 영역 내 랜덤 위치
        const position = getRandomSafePosition(width, height);
        
        // 이미지 부분 결정 (배경 위치)
        const bgX = Math.floor(Math.random() * originalWidth);
        const bgY = Math.floor(Math.random() * originalHeight);
        
        // 스타일 적용
        piece.style.width = `${width}px`;
        piece.style.height = `${height}px`;
        piece.style.left = `${position.left}px`;
        piece.style.top = `${position.top}px`;
        piece.style.backgroundPosition = `-${bgX}px -${bgY}px`;
        
        // 반투명 적용 (원본 배경이 보이도록)
        piece.style.opacity = 0.7 + (Math.random() * 0.3); // 0.7~1.0 사이
        
        // 랜덤 회전 각도
        const randomRotate = (Math.random() * 20 - 10) + 'deg';
        piece.style.setProperty('--random-rotate', randomRotate);
        
        // 랜덤 애니메이션 지연
        const animDelay = Math.random() * 5 + 's';
        piece.style.animationDelay = `0s, ${animDelay}`;
        
        // 랜덤 스타일 클래스 추가
        const styles = getRandomStyleClasses();
        piece.classList.add(styles.pieceStyle);
        piece.classList.add(styles.borderStyle);
        piece.classList.add(styles.rotateStyle);
        piece.classList.add(styles.cutEdgeStyle);
        
        // 콘테이너에 추가
        collageContainer.appendChild(piece);
    }
    
    // 조각 재배치 함수
    function reshuffleCollage() {
        // 모든 콜라주 조각 선택
        const pieces = document.querySelectorAll('.collage-piece');
        
        // 각 조각에 새 위치와 스타일 적용
        pieces.forEach(piece => {
            // 현재 크기 유지
            const width = parseInt(piece.style.width);
            const height = parseInt(piece.style.height);
            
            // 안전 영역 내 새 위치
            const position = getRandomSafePosition(width, height);
            
            // 새 랜덤 회전 각도
            const randomRotate = (Math.random() * 20 - 10) + 'deg';
            
            // 새 배경 위치
            const bgX = Math.floor(Math.random() * originalWidth);
            const bgY = Math.floor(Math.random() * originalHeight);
            
            // 스타일 업데이트
            piece.style.left = `${position.left}px`;
            piece.style.top = `${position.top}px`;
            piece.style.backgroundPosition = `-${bgX}px -${bgY}px`;
            piece.style.setProperty('--random-rotate', randomRotate);
        });
    }
    
    // 조각 추가 함수
    function addMorePieces() {
        // 5개 조각 추가
        for (let i = 0; i < 5; i++) {
            createCollagePiece();
        }
        
        // 슬라이더와 카운트 업데이트
        const newCount = Math.min(parseInt(pieceSlider.value) + 5, parseInt(pieceSlider.max));
        pieceSlider.value = newCount;
        pieceCount.textContent = newCount + ' pieces';
        currentPieceCount = newCount;
    }
    
    // 이벤트 리스너 등록
    collageContainer.addEventListener('click', reshuffleCollage);
    resetBtn.addEventListener('click', createCollage);
    addBtn.addEventListener('click', addMorePieces);
    
    // 초기 콜라주 생성
    createCollage();
});