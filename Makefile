CC = gcc
CFLAGS = -Wall -Wextra -Iinclude
SRC_DIR = src
TEST_DIR = test
INCLUDE_DIR = include
OBJ_DIR = obj
BIN_DIR = bin

SRC = $(SRC_DIR)/add.c
TEST_SRC = $(TEST_DIR)/test_add.c
OBJ = $(OBJ_DIR)/add.o
TEST_OBJ = $(OBJ_DIR)/test_add.o
BIN = $(BIN_DIR)/test_add

all: $(BIN)

$(BIN): $(OBJ) $(TEST_OBJ)
	$(CC) $(CFLAGS) -o $@ $^

$(OBJ_DIR)/%.o: $(SRC_DIR)/%.c
	$(CC) $(CFLAGS) -c $< -o $@

$(OBJ_DIR)/%.o: $(TEST_DIR)/%.c
	$(CC) $(CFLAGS) -c $< -o $@

test: all
	./$(BIN)

clean:
	rm -rf $(OBJ_DIR)/* $(BIN_DIR)/*

.PHONY: all test clean