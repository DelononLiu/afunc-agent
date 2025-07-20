CC = gcc
CFLAGS = -Wall -Wextra -Iinclude -O0 -g
TARGET = test_add
SRC = src/add.c test/test_add.c

all: $(TARGET)

$(TARGET): $(SRC)
	$(CC) $(CFLAGS) -o $@ $^

test: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: all test clean