CC = gcc
CFLAGS = -Wall -Wextra -Iinclude

SRC = src/add.c
TEST_SRC = test/test_add.c
TARGET = test_add

all: $(TARGET)

$(TARGET): $(SRC) $(TEST_SRC)
	$(CC) $(CFLAGS) $^ -o $@

test: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: all test clean