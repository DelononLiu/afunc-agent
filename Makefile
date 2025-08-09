CC = gcc
CPPFLAGS = -Iinclude
CFLAGS = -Wall -Wextra

SRC = src/addi.cpp src/addf.cpp
OBJ = $(SRC:.cpp=.o)
LIB = libadd2.a

TESTS = tests/test_addi tests/test_addf

all: $(LIB)

$(LIB): $(OBJ)
	ar rcs $@ $^

%.o: %.cpp
	$(CC) $(CPPFLAGS) $(CFLAGS) -c $< -o $@

test: $(TESTS)
	@for test in $(TESTS); do \
		echo "Running $$test"; \
		./$$test || exit 1; \
	done

tests/test_addi: tests/test_addi.cpp src/addi.o
	$(CC) $(CPPFLAGS) $(CFLAGS) $^ -o $@

clean:
	rm -f $(OBJ) $(LIB) $(TESTS)

.PHONY: all test clean
tests/test_addf: tests/test_addf.cpp src/addf.o
	$(CC) $(CPPFLAGS) $(CFLAGS) $^ -o $@ -lm