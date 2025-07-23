CC=gcc
CFLAGS=-Iinclude -Wall -Werror

test: test/test_add
	./test/test_add

test/test_add: test/test_add.o src/add.o
	$(CC) $(CFLAGS) -o test/test_add test/test_add.o src/add.o

test/test_add.o: test/test_add.c include/add.h
	$(CC) $(CFLAGS) -c test/test_add.c -o test/test_add.o

src/add.o: src/add.c include/add.h
	$(CC) $(CFLAGS) -c src/add.c -o src/add.o

clean:
	rm -f test/test_add test/test_add.o src/add.o