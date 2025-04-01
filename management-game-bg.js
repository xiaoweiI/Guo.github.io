// Management Game Background Animation
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize on the home page
    const homePage = document.getElementById('home-page');
    if (!homePage) return;
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'management-game-bg';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.15'; // Semi-transparent
    canvas.style.pointerEvents = 'none'; // Don't capture mouse events
    
    // Add canvas to the hero section
    const heroSection = homePage.querySelector('.hero');
    if (heroSection) {
        heroSection.appendChild(canvas);
    } else {
        return; // Exit if hero section not found
    }
    
    const ctx = canvas.getContext('2d');
    
    // Game colors (matching the site's pixel art theme)
    const colors = {
        blue: '#5f85db',
        purple: '#9376e0',
        pink: '#ff9eaa',
        dark: '#2d3436',
        light: '#f5f6fa'
    };
    
    // Grid settings
    const gridSize = 40; // Size of each grid cell
    const gridRows = Math.ceil(canvas.height / gridSize);
    const gridCols = Math.ceil(canvas.width / gridSize);
    
    // Game entities
    let buildings = [];
    let resources = [];
    let workers = [];
    let progressBars = [];
    
    // Building class
    class Building {
        constructor(row, col, type) {
            this.row = row;
            this.col = col;
            this.x = col * gridSize;
            this.y = row * gridSize;
            this.type = type; // 'factory', 'house', 'storage'
            this.width = type === 'factory' ? 2 : 1; // Factories are 2x2
            this.height = type === 'factory' ? 2 : 1;
            this.color = type === 'factory' ? colors.blue : 
                         type === 'house' ? colors.purple : colors.pink;
            this.productionTimer = 0;
            this.productionSpeed = Math.random() * 0.5 + 0.5;
            this.isProducing = false;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.fillRect(
                this.x, 
                this.y, 
                this.width * gridSize - 2, 
                this.height * gridSize - 2
            );
            
            // Draw pixel-art windows
            ctx.fillStyle = colors.light;
            if (this.type === 'factory') {
                // Factory windows
                ctx.fillRect(this.x + 10, this.y + 15, 15, 15);
                ctx.fillRect(this.x + 45, this.y + 15, 15, 15);
                ctx.fillRect(this.x + 10, this.y + 45, 15, 15);
                ctx.fillRect(this.x + 45, this.y + 45, 15, 15);
                
                // Chimney
                ctx.fillStyle = colors.dark;
                ctx.fillRect(this.x + 60, this.y - 10, 10, 15);
                
                // Smoke (only when producing)
                if (this.isProducing) {
                    ctx.fillStyle = 'rgba(200, 200, 200, 0.7)';
                    ctx.beginPath();
                    ctx.arc(this.x + 65, this.y - 15 - this.productionTimer * 5, 5, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(this.x + 70, this.y - 20 - this.productionTimer * 3, 4, 0, Math.PI * 2);
                    ctx.fill();
                }
            } else if (this.type === 'house') {
                // House window
                ctx.fillRect(this.x + 10, this.y + 15, 20, 15);
                
                // Door
                ctx.fillStyle = colors.dark;
                ctx.fillRect(this.x + 15, this.y + 30, 10, 8);
            } else if (this.type === 'storage') {
                // Storage crates
                ctx.fillStyle = colors.dark;
                ctx.fillRect(this.x + 10, this.y + 10, 10, 10);
                ctx.fillRect(this.x + 25, this.y + 15, 10, 10);
                ctx.fillRect(this.x + 15, this.y + 25, 10, 10);
            }
        }
        
        update() {
            // Production cycle for factories
            if (this.type === 'factory') {
                this.productionTimer += this.productionSpeed * 0.02;
                
                if (this.productionTimer >= 1) {
                    this.productionTimer = 0;
                    this.isProducing = !this.isProducing;
                    
                    // Create a new resource when production completes
                    if (!this.isProducing) {
                        resources.push(new Resource(
                            this.row + this.height / 2,
                            this.col + this.width / 2,
                            Math.floor(Math.random() * 3) // Random resource type
                        ));
                    }
                }
            }
        }
    }
    
    // Resource class
    class Resource {
        constructor(row, col, type) {
            this.row = row;
            this.col = col;
            this.x = col * gridSize + gridSize / 2;
            this.y = row * gridSize + gridSize / 2;
            this.type = type; // 0: gold, 1: wood, 2: stone
            this.color = type === 0 ? '#FFD700' : 
                         type === 1 ? '#8B4513' : '#A9A9A9';
            this.size = 8;
            this.collected = false;
            this.alpha = 1;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            
            if (this.type === 0) { // Gold coin
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#FFA500';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size - 2, 0, Math.PI * 2);
                ctx.fill();
            } else if (this.type === 1) { // Wood log
                ctx.fillRect(this.x - this.size, this.y - this.size / 2, this.size * 2, this.size);
                ctx.fillStyle = '#A0522D';
                ctx.fillRect(this.x - this.size + 2, this.y - this.size / 2 + 2, this.size * 2 - 4, this.size - 4);
            } else { // Stone
                ctx.beginPath();
                ctx.moveTo(this.x - this.size, this.y);
                ctx.lineTo(this.x, this.y - this.size);
                ctx.lineTo(this.x + this.size, this.y);
                ctx.lineTo(this.x, this.y + this.size);
                ctx.closePath();
                ctx.fill();
            }
            
            ctx.restore();
        }
        
        update() {
            if (this.collected) {
                this.alpha -= 0.05;
                this.y -= 1;
            }
        }
    }
    
    // Worker class
    class Worker {
        constructor(row, col) {
            this.row = row;
            this.col = col;
            this.x = col * gridSize + gridSize / 2;
            this.y = row * gridSize + gridSize / 2;
            this.targetX = this.x;
            this.targetY = this.y;
            this.speed = Math.random() * 0.5 + 0.5;
            this.size = 6;
            this.color = colors.dark;
            this.hasResource = false;
            this.resourceType = null;
            this.resourceColor = null;
            this.state = 'idle'; // 'idle', 'moving', 'collecting', 'delivering'
            this.idleTimer = 0;
            this.idleDuration = Math.random() * 100 + 50;
        }
        
        draw() {
            // Draw worker body
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw worker face
            ctx.fillStyle = colors.light;
            ctx.fillRect(this.x - 2, this.y - 2, 1, 1);
            ctx.fillRect(this.x + 1, this.y - 2, 1, 1);
            
            // Draw resource if carrying one
            if (this.hasResource) {
                ctx.fillStyle = this.resourceColor;
                ctx.beginPath();
                ctx.arc(this.x, this.y - this.size - 2, this.size / 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        update() {
            // State machine for worker behavior
            switch (this.state) {
                case 'idle':
                    this.idleTimer++;
                    if (this.idleTimer >= this.idleDuration) {
                        this.idleTimer = 0;
                        this.idleDuration = Math.random() * 100 + 50;
                        
                        // Decide next action
                        if (!this.hasResource && resources.length > 0) {
                            // Find nearest uncollected resource
                            let nearestResource = null;
                            let nearestDist = Infinity;
                            
                            for (let i = 0; i < resources.length; i++) {
                                if (!resources[i].collected) {
                                    const dist = Math.hypot(
                                        this.x - resources[i].x,
                                        this.y - resources[i].y
                                    );
                                    
                                    if (dist < nearestDist) {
                                        nearestDist = dist;
                                        nearestResource = resources[i];
                                    }
                                }
                            }
                            
                            if (nearestResource) {
                                this.targetX = nearestResource.x;
                                this.targetY = nearestResource.y;
                                this.targetResource = nearestResource;
                                this.state = 'moving';
                            } else {
                                // Wander randomly
                                this.setRandomTarget();
                                this.state = 'moving';
                            }
                        } else if (this.hasResource) {
                            // Find nearest storage
                            let nearestStorage = null;
                            let nearestDist = Infinity;
                            
                            for (let i = 0; i < buildings.length; i++) {
                                if (buildings[i].type === 'storage') {
                                    const dist = Math.hypot(
                                        this.x - (buildings[i].x + gridSize / 2),
                                        this.y - (buildings[i].y + gridSize / 2)
                                    );
                                    
                                    if (dist < nearestDist) {
                                        nearestDist = dist;
                                        nearestStorage = buildings[i];
                                    }
                                }
                            }
                            
                            if (nearestStorage) {
                                this.targetX = nearestStorage.x + gridSize / 2;
                                this.targetY = nearestStorage.y + gridSize / 2;
                                this.targetStorage = nearestStorage;
                                this.state = 'moving';
                            } else {
                                // Wander randomly
                                this.setRandomTarget();
                                this.state = 'moving';
                            }
                        } else {
                            // Wander randomly
                            this.setRandomTarget();
                            this.state = 'moving';
                        }
                    }
                    break;
                    
                case 'moving':
                    // Move towards target
                    const dx = this.targetX - this.x;
                    const dy = this.targetY - this.y;
                    const dist = Math.hypot(dx, dy);
                    
                    if (dist < this.speed) {
                        // Reached target
                        this.x = this.targetX;
                        this.y = this.targetY;
                        
                        if (this.targetResource && !this.hasResource) {
                            this.state = 'collecting';
                        } else if (this.targetStorage && this.hasResource) {
                            this.state = 'delivering';
                        } else {
                            this.state = 'idle';
                        }
                    } else {
                        // Move towards target
                        this.x += (dx / dist) * this.speed;
                        this.y += (dy / dist) * this.speed;
                    }
                    break;
                    
                case 'collecting':
                    // Collect resource
                    if (this.targetResource && !this.targetResource.collected) {
                        this.targetResource.collected = true;
                        this.hasResource = true;
                        this.resourceType = this.targetResource.type;
                        this.resourceColor = this.targetResource.color;
                    }
                    
                    this.targetResource = null;
                    this.state = 'idle';
                    break;
                    
                case 'delivering':
                    // Deliver resource to storage
                    if (this.targetStorage) {
                        // Create a progress bar
                        progressBars.push(new ProgressBar(
                            this.targetStorage.row,
                            this.targetStorage.col,
                            30,
                            this.resourceColor
                        ));
                        
                        this.hasResource = false;
                        this.resourceType = null;
                        this.resourceColor = null;
                    }
                    
                    this.targetStorage = null;
                    this.state = 'idle';
                    break;
            }
        }
        
        setRandomTarget() {
            // Set a random target within the grid
            const targetRow = Math.floor(Math.random() * gridRows);
            const targetCol = Math.floor(Math.random() * gridCols);
            
            this.targetX = targetCol * gridSize + gridSize / 2;
            this.targetY = targetRow * gridSize + gridSize / 2;
        }
    }
    
    // Progress Bar class
    class ProgressBar {
        constructor(row, col, duration, color) {
            this.row = row;
            this.col = col;
            this.x = col * gridSize;
            this.y = row * gridSize - 10;
            this.width = gridSize;
            this.height = 5;
            this.duration = duration;
            this.timer = 0;
            this.color = color;
            this.completed = false;
        }
        
        draw() {
            // Draw background
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            
            // Draw progress
            const progress = this.timer / this.duration;
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width * progress, this.height);
        }
        
        update() {
            this.timer++;
            
            if (this.timer >= this.duration) {
                this.completed = true;
            }
        }
    }
    
    // Initialize game entities
    function initializeGame() {
        // Create buildings
        const buildingPositions = [];
        
        // Create factories (2x2)
        for (let i = 0; i < 3; i++) {
            let row, col;
            let validPosition = false;
            
            // Find a valid position that doesn't overlap with existing buildings
            while (!validPosition) {
                row = Math.floor(Math.random() * (gridRows - 2));
                col = Math.floor(Math.random() * (gridCols - 2));
                
                validPosition = true;
                
                // Check if position overlaps with existing buildings
                for (let j = 0; j < buildingPositions.length; j++) {
                    const pos = buildingPositions[j];
                    
                    if (row <= pos.row + pos.height && row + 2 >= pos.row &&
                        col <= pos.col + pos.width && col + 2 >= pos.col) {
                        validPosition = false;
                        break;
                    }
                }
            }
            
            buildings.push(new Building(row, col, 'factory'));
            buildingPositions.push({ row, col, width: 2, height: 2 });
        }
        
        // Create houses (1x1)
        for (let i = 0; i < 5; i++) {
            let row, col;
            let validPosition = false;
            
            while (!validPosition) {
                row = Math.floor(Math.random() * gridRows);
                col = Math.floor(Math.random() * gridCols);
                
                validPosition = true;
                
                for (let j = 0; j < buildingPositions.length; j++) {
                    const pos = buildingPositions[j];
                    
                    if (row <= pos.row + pos.height && row + 1 >= pos.row &&
                        col <= pos.col + pos.width && col + 1 >= pos.col) {
                        validPosition = false;
                        break;
                    }
                }
            }
            
            buildings.push(new Building(row, col, 'house'));
            buildingPositions.push({ row, col, width: 1, height: 1 });
        }
        
        // Create storage buildings (1x1)
        for (let i = 0; i < 2; i++) {
            let row, col;
            let validPosition = false;
            
            while (!validPosition) {
                row = Math.floor(Math.random() * gridRows);
                col = Math.floor(Math.random() * gridCols);
                
                validPosition = true;
                
                for (let j = 0; j < buildingPositions.length; j++) {
                    const pos = buildingPositions[j];
                    
                    if (row <= pos.row + pos.height && row + 1 >= pos.row &&
                        col <= pos.col + pos.width && col + 1 >= pos.col) {
                        validPosition = false;
                        break;
                    }
                }
            }
            
            buildings.push(new Building(row, col, 'storage'));
            buildingPositions.push({ row, col, width: 1, height: 1 });
        }
        
        // Create initial resources
        for (let i = 0; i < 10; i++) {
            let row, col;
            let validPosition = false;
            
            while (!validPosition) {
                row = Math.floor(Math.random() * gridRows);
                col = Math.floor(Math.random() * gridCols);
                
                validPosition = true;
                
                for (let j = 0; j < buildingPositions.length; j++) {
                    const pos = buildingPositions[j];
                    
                    if (row >= pos.row && row < pos.row + pos.height &&
                        col >= pos.col && col < pos.col + pos.width) {
                        validPosition = false;
                        break;
                    }
                }
            }
            
            resources.push(new Resource(row, col, Math.floor(Math.random() * 3)));
        }
        
        // Create workers
        for (let i = 0; i < 8; i++) {
            let row, col;
            let validPosition = false;
            
            while (!validPosition) {
                row = Math.floor(Math.random() * gridRows);
                col = Math.floor(Math.random() * gridCols);
                
                validPosition = true;
                
                for (let j = 0; j < buildingPositions.length; j++) {
                    const pos = buildingPositions[j];
                    
                    if (row >= pos.row && row < pos.row + pos.height &&
                        col >= pos.col && col < pos.col + pos.width) {
                        validPosition = false;
                        break;
                    }
                }
            }
            
            workers.push(new Worker(row, col));
        }
    }
    
    // Draw grid
    function drawGrid() {
        ctx.strokeStyle = 'rgba(95, 133, 219, 0.1)';
        ctx.lineWidth = 1;
        
        // Draw vertical lines
        for (let i = 0; i <= gridCols; i++) {
            ctx.beginPath();
            ctx.moveTo(i * gridSize, 0);
            ctx.lineTo(i * gridSize, canvas.height);
            ctx.stroke();
        }
        
        // Draw horizontal lines
        for (let i = 0; i <= gridRows; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * gridSize);
            ctx.lineTo(canvas.width, i * gridSize);
            ctx.stroke();
        }
    }
    
    // Main game loop
    function gameLoop() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid
        drawGrid();
        
        // Update and draw buildings
        for (let i = 0; i < buildings.length; i++) {
            buildings[i].update();
            buildings[i].draw();
        }
        
        // Update and draw resources
        for (let i = 0; i < resources.length; i++) {
            resources[i].update();
            resources[i].draw();
            
            // Remove collected resources with zero alpha
            if (resources[i].collected && resources[i].alpha <= 0) {
                resources.splice(i, 1);
                i--;
            }
        }
        
        // Update and draw workers
        for (let i = 0; i < workers.length; i++) {
            workers[i].update();
            workers[i].draw();
        }
        
        // Update and draw progress bars
        for (let i = 0; i < progressBars.length; i++) {
            progressBars[i].update();
            progressBars[i].draw();
            
            // Remove completed progress bars
            if (progressBars[i].completed) {
                progressBars.splice(i, 1);
                i--;
            }
        }
        
        // Request next frame
        requestAnimationFrame(gameLoop);
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Recalculate grid dimensions
        gridRows = Math.ceil(canvas.height / gridSize);
        gridCols = Math.ceil(canvas.width / gridSize);
    });
    
    // Initialize game and start game loop
    initializeGame();
    gameLoop();
});
