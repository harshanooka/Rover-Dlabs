function Rover(grid, location, direction, obstacles) {

    var vm = this;
    vm.location = (location === undefined) ? [0, 0] : location; //Making the default location as [0,0]
    vm.direction = (direction === undefined) ? 'N' : direction;
    vm.grid = (grid === undefined) ? [50, 50] : grid; //Making the grid size as [50,50] if the user doesnt specify anything
    vm.obstacles = (obstacles === undefined) ? [] : obstacles;
	vm.encounteredObstacle = false;
	
	
	function updateLocation() {
		vm.location = [
			(vm.location[0] + vm.grid[0]) % vm.grid[0],
			(vm.location[1] + vm.grid[1]) % vm.grid[1]
		]
	}

    function isObstacle(newLocation) {
        for(var index = 0; index < vm.obstacles.length; index++) {
            if (newLocation.toString() == vm.obstacles[index].toString()) {
				vm.encounteredObstalce = true;
				console.log("Encountered an obstacle");
                return true;
            }
        }
        return false;
    }

    vm.commands = function(commands) {
        if (commands === undefined) {
            return vm.commandsArray;
        } else {
            for(var index = 0; index < commands.length; index++) {
                var command = commands[index];
                if (command === 'f' || command === 'b') {
                    if (!horizontalRov(command)) break;
                } else if (command === 'l' || command === 'r') {
                    verticalRov(command);
                }
            }
            updateLocation();
            vm.commandsArray = commands;
        }
    };
	
	//Calculates the new position when the rover is instructed to move horizontally
    function horizontalRov(command) {
        var xNew = 0, yNew = 0;
        if (vm.direction === 'N') {
            yNew = -1;
        } else if (vm.direction === 'E') {
            xNew = 1;
        } else if (vm.direction === 'S') {
            yNew = 1;
        } else if (vm.direction === 'W') {
            xNew = -1;
        }
        if (command === 'b') {
            xNew *= -1;
            yNew *= -1;
        }
        var newLocation = [vm.location[0] + xNew, vm.location[1] + yNew];
        if (isObstacle(newLocation)) {
            return false;
        }
        vm.location = newLocation;
        return true;
    }

	//Calculates the new position when the rover is instructed to move vertically
    function verticalRov(command) {
        var directionIndex = findDirectionIndex(vm.direction);
        if (command === 'l') {
            directionIndex = (directionIndex + 4 - 1) % 4;
        } else {
            directionIndex = (directionIndex + 1) % 4;
        }
        vm.direction = vm.directions[directionIndex];
    }

    vm.directions = ['N', 'E', 'S', 'W'];

    function findDirectionIndex(direction) {
        for(var index = 0; index < 4; index++) {
            if (vm.directions[index] === direction) return index;
        }
    }

}