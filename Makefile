CXX = g++
CXXFLAGS = -Wall -Wextra -Iinclude

TARGET = test_add
SRC = src/add.cpp tests/test_add.cpp

all: $(TARGET)

$(TARGET): $(SRC)
	$(CXX) $(CXXFLAGS) $^ -o $@

test: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET)

.PHONY: all test clean