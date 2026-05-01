# ifdef in Makefile

```make
TARGET_FILE := your_target_file.txt

all: check_file

check_file:
    ifdef TARGET_FILE
        @if [ -e $(TARGET_FILE) ]; then \
            echo "File $(TARGET_FILE) exists. Running target..."; \
            $(MAKE) run_target; \
        else \
            echo "File $(TARGET_FILE) does not exist."; \
            $(MAKE) create_file; \
        fi
    else
        @echo "TARGET_FILE is not set. Please set it to the desired file."
    endif

run_target:
    @echo "Running the target..."

create_file:
    @echo "Creating $(TARGET_FILE)..."
    @echo "Hello, World!" > $(TARGET_FILE)

.PHONY: all check_file run_target create_file
```
