for num in range(1, 101):
    if num % 3 == 0:
        print("Hello", end=", ")
    elif num % 5 == 0:
        print("World", end=", ")
    elif num % 7 == 0:
        print("Yoo", end=", ")
    else:
        print(num, end=", ")
