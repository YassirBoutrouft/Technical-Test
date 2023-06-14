for (let num = 1; num <= 100; num++) {
    if (num % 3 === 0) {
        process.stdout.write("Hello, ");
    } else if (num % 5 === 0) {
        process.stdout.write("World, ");
    } else if (num % 7 === 0) {
        process.stdout.write("Yoo, ");
    } else {
        process.stdout.write(num + ", ");
    }
}

