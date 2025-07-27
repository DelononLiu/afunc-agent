CC = gcc
CFLAGS = -Wall -I./src/include
SRC_DIR = src/operators
TEST_DIR = tests/operators
LIB_DIR = lib
OBJ_DIR = obj

SRCS = $(wildcard $(SRC_DIR)/*.c)
OBJS = $(patsubst $(SRC_DIR)/%.c,$(OBJ_DIR)/%.o,$(SRCS))

LIB_NAME = operator
LIB = $(LIB_DIR)/lib$(LIB_NAME).a

TEST_SRC = $(wildcard $(TEST_DIR)/*.c)
TEST_EXE = test_$(LIB_NAME)

.PHONY: all lib test clean

all: lib test

lib: $(LIB)

$(LIB): $(OBJS)
	@mkdir -p $(LIB_DIR)
	ar rcs $@ $^

$(OBJ_DIR)/%.o: $(SRC_DIR)/%.c
	@mkdir -p $(OBJ_DIR)
	$(CC) $(CFLAGS) -c $< -o $@

test: $(TEST_EXE)
	./$(TEST_EXE)

$(TEST_EXE): $(TEST_DIR)/test_add.c $(LIB)
	$(CC) $(CFLAGS) $^ -o $@ -L$(LIB_DIR) -l$(LIB_NAME)

clean:
	rm -rf $(OBJ_DIR) $(LIB_DIR) $(TEST_EXE)