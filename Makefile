CC = gcc
CFLAGS = -Wall -I./src/include
SRC_DIR = src/operators
TEST_DIR = tests/operators
LIB_DIR = lib
OBJ_DIR = obj

LIB_NAME = libadd.a
TEST_EXE = test_add

SRCS = $(wildcard $(SRC_DIR)/*.c)
OBJS = $(patsubst $(SRC_DIR)/%.c,$(OBJ_DIR)/%.o,$(SRCS))

all: lib test

lib: $(LIB_DIR)/$(LIB_NAME)

$(LIB_DIR)/$(LIB_NAME): $(OBJS)
	mkdir -p $(LIB_DIR)
	ar rcs $@ $^

$(OBJ_DIR)/%.o: $(SRC_DIR)/%.c
	mkdir -p $(OBJ_DIR)
	$(CC) $(CFLAGS) -c $< -o $@

test: $(TEST_EXE)
	./$(TEST_EXE)

$(TEST_EXE): $(TEST_DIR)/test_add.c $(LIB_DIR)/$(LIB_NAME)
	$(CC) $(CFLAGS) $^ -o $@ -L./$(LIB_DIR) -ladd

clean:
	rm -rf $(OBJ_DIR) $(LIB_DIR) $(TEST_EXE)

.PHONY: all lib test clean